import { Controller, Get, Post, Body, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { UserBehaviorService } from './user-behavior.service';
import { CreateBrowsingHistoryDto, CreateClickstreamDto, CreateSearchQueryDto } from './dto/user-behavior.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';
import { Roles } from '../../core/roles/roles.decorator';
import { Role } from '../../core/roles/role.enum';

@Controller('user-behavior')
export class UserBehaviorController {
  constructor(private readonly userBehaviorService: UserBehaviorService) {}

  @Post('browsing-history')
  addBrowsingHistory(@Body() dto: CreateBrowsingHistoryDto) {
    return this.userBehaviorService.addBrowsingHistory(dto);
  }

  @Get('browsing-history/:userId')
  @UseGuards(JwtAuthGuard)
  getBrowsingHistory(@Param('userId') userId: string) {
    return this.userBehaviorService.getBrowsingHistory(userId);
  }

  @Post('search-query')
  recordSearchQuery(@Body() dto: CreateSearchQueryDto) {
    return this.userBehaviorService.recordSearchQuery(dto);
  }

  @Get('search-queries/:userId')
  @UseGuards(JwtAuthGuard)
  getUserSearchQueries(@Param('userId') userId: string) {
    return this.userBehaviorService.getUserSearchQueries(userId);
  }

  @Post('clickstream')
  recordClickEvent(@Body() dto: CreateClickstreamDto) {
    return this.userBehaviorService.recordClickEvent(dto);
  }

  @Get('analytics/popular-products')
  getPopularProducts(@Query('limit') limit: number = 10) {
    return this.userBehaviorService.getPopularProducts(limit);
  }

  @Get('analytics/user-interests/:userId')
  @UseGuards(JwtAuthGuard)
  getUserInterests(@Param('userId') userId: string) {
    return this.userBehaviorService.getUserInterests(userId);
  }

  @Get('user-profile/:userId')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Param('userId') userId: string) {
    return this.userBehaviorService.findByUserId(userId);
  }

  @Get('stats/:userId')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  getUserStats(@Param('userId') userId: string) {
    return this.userBehaviorService.getUserStats(userId);
  }

  @Post(':userId/track')
  trackActivity(
    @Param('userId') userId: string,
    @Body() activity: any
  ) {
    return this.userBehaviorService.trackActivity(userId, activity);
  }
}
