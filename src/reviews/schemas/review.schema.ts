import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true, type: String })
  productId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  videos: string[];

  @Prop({ type: Boolean, default: false })
  isVerifiedPurchase: boolean;

  @Prop({ type: Number, default: 0 })
  helpfulVotes: number;

  @Prop({ type: Number, default: 0 })
  notHelpfulVotes: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  publishedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
