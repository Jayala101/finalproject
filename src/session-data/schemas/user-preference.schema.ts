import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserPreference extends Document {
  @Prop({ required: true, type: String, unique: true })
  userId: string;

  @Prop({ type: String })
  sessionId: string;

  @Prop({ type: Object, default: {} })
  uiPreferences: Record<string, any>;

  @Prop({ type: Object, default: {} })
  filterPreferences: Record<string, any>;

  @Prop({ type: Object, default: {} })
  sortPreferences: Record<string, any>;

  @Prop({ type: [String], default: [] })
  recentlyViewedCategories: string[];

  @Prop({ type: Date, default: Date.now })
  lastUpdated: Date;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
