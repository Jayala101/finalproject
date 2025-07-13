import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SearchQuery extends Document {
  @Prop({ type: String })
  userId: string;

  @Prop({ required: true })
  query: string;

  @Prop({ type: Number, default: 0 })
  resultCount: number;

  @Prop({ type: [String], default: [] })
  clickedProductIds: string[];

  @Prop({ type: Object, default: {} })
  filters: Record<string, any>;

  @Prop({ type: Date, default: Date.now })
  searchedAt: Date;
}

export const SearchQuerySchema = SchemaFactory.createForClass(SearchQuery);
