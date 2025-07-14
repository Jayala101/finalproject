import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDescriptionDocument = ProductDescription & Document;

@Schema({ timestamps: true })
export class ProductDescription {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  features: string[];

  @Prop({ type: Object })
  specifications: Record<string, string>;

  @Prop()
  seoKeywords: string[];

  @Prop()
  seoDescription: string;
}

export const ProductDescriptionSchema = SchemaFactory.createForClass(ProductDescription);
