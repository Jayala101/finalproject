import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class NotificationTemplate extends Document {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  template: string; // Can include placeholders like {{name}}, {{orderId}}, etc.

  @Prop()
  description: string;

  @Prop({ type: String, required: true })
  type: string; // e.g., 'email', 'push', 'in-app'

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const NotificationTemplateSchema = SchemaFactory.createForClass(NotificationTemplate);
