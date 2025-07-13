import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductTag extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String], default: [] })
  productIds: string[];

  @Prop({ type: Number, default: 0 })
  usageCount: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const ProductTagSchema = SchemaFactory.createForClass(ProductTag);
