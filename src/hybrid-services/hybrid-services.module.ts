import { Module } from '@nestjs/common';
import { ProductServiceModule } from './product-service/product-service.module';
import { UserServiceModule } from './user-service/user-service.module';
import { RecommendationEngineModule } from './recommendation-engine/recommendation-engine.module';

@Module({
  imports: [
    ProductServiceModule,
    UserServiceModule,
    RecommendationEngineModule,
  ],
  exports: [
    ProductServiceModule,
    UserServiceModule,
    RecommendationEngineModule,
  ],
})
export class HybridServicesModule {}
