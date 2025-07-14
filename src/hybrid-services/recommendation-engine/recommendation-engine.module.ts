import { Module } from '@nestjs/common';
import { ProductsModule } from '../../postgres-modules/products/products.module';
import { UserBehaviorModule } from '../../mongo-modules/user-behavior/user-behavior.module';
import { AnalyticsModule } from '../../mongo-modules/analytics/analytics.module';
import { SessionDataModule } from '../../mongo-modules/session-data/session-data.module';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';

@Module({
  imports: [
    ProductsModule, // PostgreSQL products
    UserBehaviorModule, // MongoDB user behavior
    AnalyticsModule, // MongoDB analytics
    SessionDataModule, // MongoDB session data
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
  exports: [RecommendationService],
})
export class RecommendationEngineModule {}
