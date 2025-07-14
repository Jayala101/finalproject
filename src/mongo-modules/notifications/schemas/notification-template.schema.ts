import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationTemplateDocument = NotificationTemplate & Document;

@Schema({ timestamps: true })
export class NotificationTemplate {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  messageTemplate: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const NotificationTemplateSchema = SchemaFactory.createForClass(NotificationTemplate);
