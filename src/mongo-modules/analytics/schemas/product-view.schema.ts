import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductViewDocument = ProductView & Document;

@Schema({ timestamps: true })
export class ProductView {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  productId: string;

  @Prop()
  sessionId: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ProductViewSchema = SchemaFactory.createForClass(ProductView);
