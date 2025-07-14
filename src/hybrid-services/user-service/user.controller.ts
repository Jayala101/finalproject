import { Controller, Get, Patch, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { TrackActivityDto } from './dto/track-activity.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { Roles } from '../../core/roles/roles.decorator';

@Controller('hybrid/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Param('id') id: string) {
    return this.userService.findUserProfile(id);
  }

  @Patch('profile/:id')
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.userService.updateUserProfile(id, updateUserProfileDto);
  }

  @Post(':id/activity')
  @UseGuards(JwtAuthGuard)
  async trackUserActivity(
    @Param('id') id: string,
    @Body() trackActivityDto: TrackActivityDto,
  ) {
    return this.userService.trackUserActivity(id, trackActivityDto);
  }

  @Get(':id/recommendations')
  @UseGuards(JwtAuthGuard)
  async getUserRecommendations(@Param('id') id: string) {
    return this.userService.getUserRecommendations(id);
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async getUserStats(@Param('id') id: string) {
    return this.userService.getUserStats(id);
  }
}
