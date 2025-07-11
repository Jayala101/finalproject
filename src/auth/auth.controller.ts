import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    if (!result.success) {
      throw new UnauthorizedException(result.message || 'Login failed');
    }
    return new SuccessResponseDto(result.message || 'Login successful', result.data);
  }

  @Post('register')
  // This endpoint creates customer accounts for purchasing products
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    if (!result.success) {
      throw new BadRequestException(result.message || 'Registration failed');
    }
    return new SuccessResponseDto(result.message || 'Registration successful', result.data);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const userId = (req as any).user.id;
    const result = await this.authService.getProfile(userId);
    if (!result.success) {
      throw new UnauthorizedException(result.message || 'Profile access denied');
    }
    return new SuccessResponseDto('Profile retrieved successfully', result.data);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    const userId = (req as any).user.id;
    const result = await this.authService.logout(userId);
    return new SuccessResponseDto(result.message || 'Logout successful', {});
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() req: Request) {
    const userId = (req as any).user.id;
    const result = await this.authService.refreshToken(userId);
    if (!result.success) {
      throw new UnauthorizedException(result.message || 'Token refresh failed');
    }
    return new SuccessResponseDto(result.message || 'Token refreshed successfully', result.data);
  }
}
