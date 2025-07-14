import { Controller, Get, Post, Query, Param, UseGuards } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { GetRecommendationsDto } from './dto/get-recommendations.dto';
import { JwtAuthGuard } from '../../core/auth/guards/jwt-auth.guard';

@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getPersonalizedRecommendations(
    @Param('userId') userId: string,
    @Query() query: GetRecommendationsDto,
  ) {
    return this.recommendationService.getPersonalizedRecommendations(userId, query.limit);
  }

  @Get('session/:sessionId')
  async getSessionBasedRecommendations(
    @Param('sessionId') sessionId: string,
    @Query() query: GetRecommendationsDto,
  ) {
    return this.recommendationService.getSessionBasedRecommendations(sessionId, query.limit);
  }

  @Get('category/:categoryId')
  async getCategoryRecommendations(
    @Param('categoryId') categoryId: string,
    @Query() query: GetRecommendationsDto,
  ) {
    return this.recommendationService.getCategoryRecommendations(categoryId, query.limit);
  }

  @Get('related/:productId')
  async getRelatedProducts(
    @Param('productId') productId: string,
    @Query() query: GetRecommendationsDto,
  ) {
    return this.recommendationService.getRelatedProducts(productId, query.limit);
  }
}
