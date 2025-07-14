import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserPreferenceDocument = UserPreference & Document;

@Schema({ timestamps: true })
export class UserPreference {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: Object, default: {} })
  preferredCategories: Record<string, number>;

  @Prop({ type: [String], default: [] })
  favoriteProducts: string[];

  @Prop({ type: Object, default: {} })
  interfaceSettings: Record<string, any>;

  @Prop({ type: Object, default: {} })
  notificationPreferences: Record<string, boolean>;

  @Prop()
  lastLoginAt: Date;

  @Prop({ default: 'en' })
  language: string;

  @Prop({ default: 'USD' })
  currency: string;
}

export const UserPreferenceSchema = SchemaFactory.createForClass(UserPreference);
