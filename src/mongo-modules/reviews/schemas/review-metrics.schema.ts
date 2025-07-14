import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewMetricsDocument = ReviewMetrics & Document;

@Schema({ timestamps: true })
export class ReviewMetrics {
  @Prop({ required: true, unique: true })
  productId: string;

  @Prop({ default: 0 })
  totalReviews: number;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ type: Object, default: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } })
  ratingDistribution: Record<number, number>;

  @Prop({ default: 0 })
  verifiedReviews: number;
}

export const ReviewMetricsSchema = SchemaFactory.createForClass(ReviewMetrics);
