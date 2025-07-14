import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './schemas/review.schema';
import { ReviewMetrics, ReviewMetricsSchema } from './schemas/review-metrics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      { name: ReviewMetrics.name, schema: ReviewMetricsSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ReviewsModule {}
