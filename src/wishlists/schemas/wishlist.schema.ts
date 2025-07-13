import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wishlist extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Boolean, default: false })
  isPublic: boolean;

  @Prop({ type: [String], default: [] })
  productIds: string[];

  @Prop({ type: Date, default: Date.now })
  lastUpdated: Date;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
