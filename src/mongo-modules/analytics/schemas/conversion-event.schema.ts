import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversionEventDocument = ConversionEvent & Document;

@Schema({ timestamps: true })
export class ConversionEvent {
  @Prop({ required: true })
  eventType: string; // purchase, signup, newsletter, etc.

  @Prop()
  userId: string;

  @Prop()
  sessionId: string;

  @Prop({ default: Date.now })
  timestamp: Date;

  @Prop()
  value: number; // monetary value if applicable

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop()
  conversionPath: string[]; // sequence of pages/actions leading to conversion

  @Prop()
  source: string; // marketing source

  @Prop()
  campaign: string;
}

export const ConversionEventSchema = SchemaFactory.createForClass(ConversionEvent);
