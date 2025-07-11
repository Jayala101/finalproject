import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const user: User | null = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        return {
          success: false,
          message: 'User not found with this email address'
        };
      }
      
      const isValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isValid) {
        return {
          success: false,
          message: 'Invalid password'
        };
      }

      if (!user.isActive) {
        return {
          success: false,
          message: 'Account is deactivated'
        };
      }
      
      const payload = { 
        sub: user.id,
        id: user.id, 
        email: user.email, 
        name: `${user.first_name} ${user.last_name}`, 
        role: user.role 
      };
      const access_token = this.jwtService.sign(payload);
      
      // Remove password from user object before returning
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        data: {
          access_token,
          user: {
            ...userWithoutPassword,
            name: `${user.first_name} ${user.last_name}`,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }
        },
        message: 'Login successful'
      };
    } catch (err) {
      console.error('Unexpected login error:', err);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  }

  async register(createUserDto: CreateUserDto): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(createUserDto.email);
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists with this email address'
        };
      }

      // Force role to CUSTOMER for frontend registration (security measure)
      const customerUserDto = {
        ...createUserDto,
        role: UserRole.CUSTOMER // Explicitly set to customer role
      };

      const user = await this.usersService.create(customerUserDto);
      if (!user) {
        return {
          success: false,
          message: 'Failed to create user account'
        };
      }
      
      const payload = { 
        sub: user.id,
        id: user.id, 
        email: user.email, 
        name: `${user.first_name} ${user.last_name}`, 
        role: user.role 
      };
      const access_token = this.jwtService.sign(payload);
      
      // Remove password from user object before returning
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        data: {
          access_token,
          user: {
            ...userWithoutPassword,
            name: `${user.first_name} ${user.last_name}`,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }
        },
        message: 'Registration successful'
      };
    } catch (err) {
      console.error('Unexpected registration error:', err);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    }
  }

  async validateUser(payload: any): Promise<User | null> {
    try {
      const user = await this.usersService.findOne(payload.sub || payload.id);
      if (user && user.isActive) {
        return user;
      }
      return null;
    } catch (err) {
      console.error('Error validating user:', err);
      return null;
    }
  }

  async getProfile(userId: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const user = await this.usersService.findOne(userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        data: {
          ...userWithoutPassword,
          name: `${user.first_name} ${user.last_name}`,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      };
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return {
        success: false,
        message: 'An error occurred while fetching profile'
      };
    }
  }

  async logout(userId: string): Promise<{ success: boolean; message?: string }> {
    try {
      // In a real application, you might want to:
      // 1. Add the token to a blacklist
      // 2. Update last logout time
      // 3. Clear any session data
      
      // For now, we'll just return success
      // The actual logout logic happens on the frontend by removing the token
      
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (err) {
      console.error('Error during logout:', err);
      return {
        success: false,
        message: 'An error occurred during logout'
      };
    }
  }

  async refreshToken(userId: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const user = await this.usersService.findOne(userId);
      if (!user || !user.isActive) {
        return {
          success: false,
          message: 'User not found or inactive'
        };
      }

      const payload = { 
        sub: user.id,
        id: user.id, 
        email: user.email, 
        name: `${user.first_name} ${user.last_name}`, 
        role: user.role 
      };
      const access_token = this.jwtService.sign(payload);

      return {
        success: true,
        data: {
          access_token
        },
        message: 'Token refreshed successfully'
      };
    } catch (err) {
      console.error('Error refreshing token:', err);
      return {
        success: false,
        message: 'An error occurred while refreshing token'
      };
    }
  }

  async createAdmin(createUserDto: CreateUserDto): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findByEmail(createUserDto.email);
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists with this email address'
        };
      }

      // Force role to ADMIN for admin creation
      const adminUserDto = {
        ...createUserDto,
        role: UserRole.ADMIN
      };

      const user = await this.usersService.create(adminUserDto);
      if (!user) {
        return {
          success: false,
          message: 'Failed to create admin account'
        };
      }
      
      // Remove password from user object before returning
      const { password, ...userWithoutPassword } = user;
      
      return {
        success: true,
        data: {
          user: {
            ...userWithoutPassword,
            name: `${user.first_name} ${user.last_name}`,
            createdAt: user.created_at,
            updatedAt: user.updated_at
          }
        },
        message: 'Admin created successfully'
      };
    } catch (err) {
      console.error('Unexpected admin creation error:', err);
      return {
        success: false,
        message: 'An error occurred during admin creation'
      };
    }
  }
}
