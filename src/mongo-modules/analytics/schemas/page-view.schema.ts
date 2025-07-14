import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageViewDocument = PageView & Document;

@Schema({ timestamps: true })
export class PageView {
  @Prop({ required: true })
  url: string;

  @Prop()
  userId: string;

  @Prop()
  sessionId: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  referrer: string;

  @Prop()
  deviceType: string;

  @Prop()
  browser: string;

  @Prop()
  duration: number; // seconds on page

  @Prop()
  country: string;

  @Prop()
  ipAddress: string;
}

export const PageViewSchema = SchemaFactory.createForClass(PageView);
