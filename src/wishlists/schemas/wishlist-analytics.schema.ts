import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class WishlistAnalytics extends Document {
  @Prop({ required: true, type: String })
  wishlistId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ type: Number, default: 0 })
  viewCount: number;

  @Prop({ type: Number, default: 0 })
  itemsAddedToCart: number;

  @Prop({ type: Number, default: 0 })
  itemsPurchased: number;

  @Prop({ type: [String], default: [] })
  purchasedProductIds: string[];

  @Prop({ type: Date })
  lastPurchaseDate: Date;

  @Prop({ type: Number, default: 0 })
  shareCount: number;
}

export const WishlistAnalyticsSchema = SchemaFactory.createForClass(WishlistAnalytics);
