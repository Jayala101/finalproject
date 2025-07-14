import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClickstreamDocument = Clickstream & Document;

@Schema({ timestamps: true })
export class ClickEvent {
  @Prop({ required: true })
  eventType: string; // pageView, click, addToCart, etc.

  @Prop({ required: true })
  timestamp: Date;

  @Prop()
  url: string;

  @Prop()
  element: string; // button, link, image, etc.

  @Prop()
  elementId: string;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

@Schema({ timestamps: true })
export class Clickstream {
  @Prop({ required: true })
  userId: string;

  @Prop()
  sessionId: string;

  @Prop()
  deviceInfo: string;

  @Prop()
  ipAddress: string;

  @Prop({ type: [Object], default: [] })
  events: ClickEvent[];
}

export const ClickstreamSchema = SchemaFactory.createForClass(Clickstream);
