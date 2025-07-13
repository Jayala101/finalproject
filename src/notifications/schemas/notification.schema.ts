import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: String })
  type: string; // e.g., 'order', 'promotion', 'system', etc.

  @Prop({ type: Object, default: {} })
  data: Record<string, any>; // Additional data related to the notification

  @Prop({ type: String })
  link: string; // Optional link to redirect when notification is clicked

  @Prop({ type: Boolean, default: false })
  isRead: boolean;

  @Prop({ type: Date, default: Date.now })
  sentAt: Date;

  @Prop({ type: Date })
  readAt: Date;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
