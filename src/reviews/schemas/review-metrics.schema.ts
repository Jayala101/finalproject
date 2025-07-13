import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ReviewMetrics extends Document {
  @Prop({ required: true, type: String, unique: true })
  productId: string;

  @Prop({ type: Number, default: 0 })
  totalReviews: number;

  @Prop({ type: Number, default: 0, min: 0, max: 5 })
  averageRating: number;

  @Prop({ type: [Number], default: [0, 0, 0, 0, 0] })
  ratingDistribution: number[]; // Index 0 = 1 star, Index 4 = 5 stars

  @Prop({ type: Number, default: 0 })
  verifiedPurchaseCount: number;

  @Prop({ type: Number, default: 0 })
  withImagesCount: number;

  @Prop({ type: Number, default: 0 })
  withVideosCount: number;

  @Prop({ type: Date })
  lastReviewDate: Date;
}

export const ReviewMetricsSchema = SchemaFactory.createForClass(ReviewMetrics);
