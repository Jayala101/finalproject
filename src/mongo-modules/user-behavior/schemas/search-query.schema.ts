import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SearchQueryDocument = SearchQuery & Document;

@Schema({ timestamps: true })
export class SearchQuery {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  query: string;

  @Prop({ default: Date.now })
  searchedAt: Date;

  @Prop({ type: [String], default: [] })
  resultProductIds: string[];

  @Prop()
  clickedProductIds: string[];

  @Prop({ type: Object })
  filters: Record<string, any>;

  @Prop()
  resultCount: number;

  @Prop()
  category: string;
}

export const SearchQuerySchema = SchemaFactory.createForClass(SearchQuery);
