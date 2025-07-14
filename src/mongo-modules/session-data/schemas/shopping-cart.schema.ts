import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ type: Object })
  selectedOptions: Record<string, string>;

  @Prop()
  price: number;
}

@Schema({ timestamps: true })
export class ShoppingCart {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: [Object], default: [] })
  items: CartItem[];

  @Prop()
  lastUpdated: Date;

  @Prop()
  couponCode: string;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
