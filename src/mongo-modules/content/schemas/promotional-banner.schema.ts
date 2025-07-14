import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromotionalBannerDocument = PromotionalBanner & Document;

@Schema({ timestamps: true })
export class PromotionalBanner {
  @Prop({ required: true })
  title: string;

  @Prop()
  subtitle: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  linkUrl: string;

  @Prop()
  buttonText: string;

  @Prop({ default: 'header' })
  position: string; // header, sidebar, footer, popup, etc.

  @Prop({ default: Date.now })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  priority: number; // order of display

  @Prop({ type: [String], default: [] })
  targetPages: string[]; // URLs where banner should display

  @Prop({ type: Object })
  styles: Record<string, any>; // custom CSS

  @Prop()
  campaignId: string; // reference to associated campaign
}

export const PromotionalBannerSchema = SchemaFactory.createForClass(PromotionalBanner);
