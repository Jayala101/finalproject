import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, DEFAULT_ROLE } from '../../core/roles/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const userExists = await this.usersRepository.findOne({ 
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username }
      ]
    });

    if (userExists) {
      throw new ConflictException('User with this email or username already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      roles: createUserDto.roles || [DEFAULT_ROLE],
    });

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  /**
   * Create an admin user
   */
  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const adminDto = { ...createUserDto, roles: [Role.ADMIN] };
    return this.create(adminDto);
  }

  /**
   * Promote user to admin
   */
  async promoteToAdmin(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    if (!user.roles.includes(Role.ADMIN)) {
      user.roles.push(Role.ADMIN);
    }
    return this.usersRepository.save(user);
  }

  /**
   * Check if user has specific role
   */
  async hasRole(userId: string, role: Role): Promise<boolean> {
    const user = await this.findOne(userId);
    return user.roles.includes(role);
  }

  /**
   * Get all admin users
   */
  async findAdmins(): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where(':role = ANY(user.roles)', { role: Role.ADMIN })
      .getMany();
  }
}
