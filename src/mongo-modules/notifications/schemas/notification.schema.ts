import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  read: boolean;

  @Prop()
  type: string;

  @Prop({ type: Object })
  data: Record<string, any>;

  @Prop({ default: Date.now })
  sentAt: Date;

  @Prop()
  expiresAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
