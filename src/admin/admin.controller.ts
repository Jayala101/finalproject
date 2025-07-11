import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SuccessResponseDto } from '../common/dto/response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.createAdmin(createUserDto);
    if (!result.success) {
      throw new BadRequestException(result.message || 'Admin creation failed');
    }
    return new SuccessResponseDto(result.message || 'Admin created successfully', result.data);
  }
}
