import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './review.entity';
import { Review as ReviewMongo, ReviewSchema } from './schemas/review.schema';
import { ReviewMetrics, ReviewMetricsSchema } from './schemas/review-metrics.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    MongooseModule.forFeature([
      { name: ReviewMongo.name, schema: ReviewSchema },
      { name: ReviewMetrics.name, schema: ReviewMetricsSchema },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
