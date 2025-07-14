import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BrowsingHistoryDocument = BrowsingHistory & Document;

@Schema({ timestamps: true })
export class BrowsingHistoryItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  viewedAt: Date;

  @Prop()
  duration: number; // time spent in seconds

  @Prop()
  source: string; // where they came from (search, category, recommendation, etc.)
}

@Schema({ timestamps: true })
export class BrowsingHistory {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [Object], default: [] })
  history: BrowsingHistoryItem[];
}

export const BrowsingHistorySchema = SchemaFactory.createForClass(BrowsingHistory);
