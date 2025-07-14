import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop()
  userId: string;

  @Prop()
  userAgent: string;

  @Prop()
  ipAddress: string;

  @Prop()
  referrer: string;

  @Prop({ default: Date.now })
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
