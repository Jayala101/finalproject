import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryViewDocument = CategoryView & Document;

@Schema({ timestamps: true })
export class CategoryView {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  categoryId: string;

  @Prop()
  sessionId: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const CategoryViewSchema = SchemaFactory.createForClass(CategoryView);
