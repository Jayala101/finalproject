import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Clickstream extends Document {
  @Prop({ type: String })
  userId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  path: string;

  @Prop({ type: String })
  event: string;

  @Prop({ type: Object, default: {} })
  eventData: Record<string, any>;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: String })
  referrer: string;

  @Prop({ type: String })
  userAgent: string;

  @Prop({ type: String })
  ipAddress: string;
}

export const ClickstreamSchema = SchemaFactory.createForClass(Clickstream);
