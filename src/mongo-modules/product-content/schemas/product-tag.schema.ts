import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductTagDocument = ProductTag & Document;

@Schema({ timestamps: true })
export class ProductTag {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  tagName: string;

  @Prop()
  tagType: string;

  @Prop()
  relevanceScore: number;
}

export const ProductTagSchema = SchemaFactory.createForClass(ProductTag);
