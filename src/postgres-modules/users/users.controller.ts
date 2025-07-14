import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  Request,
  ForbiddenException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { 
  Roles, 
  AdminOnly, 
  AuthenticatedOnly, 
  PublicRoute 
} from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Public registration endpoint
   */
  @Post('register')
  @PublicRoute()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Admin-only endpoint to create users with specific roles
   */
  @Post('admin/create')
  @AdminOnly()
  async createUserAsAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Admin-only endpoint to create admin users
   */
  @Post('admin/create-admin')
  @AdminOnly()
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

  /**
   * Admin-only endpoint to view all users
   */
  @Get()
  @AdminOnly()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Admin-only endpoint to get all admin users
   */
  @Get('admins')
  @AdminOnly()
  async findAdmins() {
    return this.usersService.findAdmins();
  }

  /**
   * Authenticated users can view their own profile
   * Admins can view any profile
   */
  @Get(':id')
  @AuthenticatedOnly()
  async findOne(@Param('id') id: string, @Request() req: any) {
    // Users can only view their own profile unless they're admin
    if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException('You can only view your own profile');
    }
    return this.usersService.findOne(id);
  }

  /**
   * Get current user's profile
   */
  @Get('profile/me')
  @AuthenticatedOnly()
  async getMyProfile(@Request() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  /**
   * Users can update their own profile
   * Admins can update any profile
   */
  @Patch(':id')
  @AuthenticatedOnly()
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: Partial<CreateUserDto>,
    @Request() req: any
  ) {
    // Users can only update their own profile unless they're admin
    if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
      throw new ForbiddenException('You can only update your own profile');
    }
    
    // Only admins can change roles
    if (updateUserDto.roles && !req.user.roles.includes(Role.ADMIN)) {
      delete updateUserDto.roles;
    }
    
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Admin-only endpoint to promote user to admin
   */
  @Patch(':id/promote-admin')
  @AdminOnly()
  async promoteToAdmin(@Param('id') id: string) {
    return this.usersService.promoteToAdmin(id);
  }

  /**
   * Admin-only endpoint to delete users
   */
  @Delete(':id')
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
