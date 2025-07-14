import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MarketingCampaignDocument = MarketingCampaign & Document;

@Schema({ timestamps: true })
export class MarketingCampaign {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string; // email, social, banner, etc.

  @Prop({ default: Date.now })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 'draft' })
  status: string; // draft, active, paused, completed

  @Prop({ type: Object })
  content: {
    title: string;
    body: string;
    callToAction: string;
    images: string[];
  };

  @Prop({ type: Object })
  targeting: {
    userSegments: string[];
    demographics: Record<string, any>;
    interests: string[];
  };

  @Prop({ type: Object })
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };

  @Prop({ type: [String] })
  productIds: string[];
}

export const MarketingCampaignSchema = SchemaFactory.createForClass(MarketingCampaign);
