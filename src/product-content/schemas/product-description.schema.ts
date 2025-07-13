import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductDescription extends Document {
  @Prop({ required: true, type: String })
  productId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  longDescription: string;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: Object, default: {} })
  specifications: Record<string, any>;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  videos: string[];

  @Prop({ type: Date, default: Date.now })
  lastUpdated: Date;
}

export const ProductDescriptionSchema = SchemaFactory.createForClass(ProductDescription);
