import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class CartItem {
  @Prop({ required: true, type: String })
  productId: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: Object, default: {} })
  attributes: Record<string, any>;

  @Prop({ type: Date, default: Date.now })
  addedAt: Date;
}

@Schema({ timestamps: true })
export class ShoppingCart extends Document {
  @Prop({ required: true, type: String, unique: true })
  userId: string;

  @Prop({ type: String })
  sessionId: string;

  @Prop({ type: [Object], default: [] })
  items: CartItem[];

  @Prop({ type: Date, default: Date.now })
  lastUpdated: Date;

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
