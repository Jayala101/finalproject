import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BrowsingHistory extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  productId: string;

  @Prop({ required: true, type: Date, default: Date.now })
  viewedAt: Date;

  @Prop({ type: Number, default: 1 })
  viewCount: number;

  @Prop({ type: Number, default: 0 })
  timeSpentSeconds: number;

  @Prop({ type: String })
  referrer: string;

  @Prop({ type: String })
  userAgent: string;
}

export const BrowsingHistorySchema = SchemaFactory.createForClass(BrowsingHistory);
