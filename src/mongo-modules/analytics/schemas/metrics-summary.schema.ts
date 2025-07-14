import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MetricsSummaryDocument = MetricsSummary & Document;

@Schema({ timestamps: true })
export class MetricsSummary {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: Object })
  dailyVisitors: {
    total: number;
    unique: number;
    newUsers: number;
    returningUsers: number;
  };

  @Prop({ type: Object })
  traffic: {
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    topReferrers: Record<string, number>;
  };

  @Prop({ type: Object })
  sales: {
    revenue: number;
    transactions: number;
    avgOrderValue: number;
    conversionRate: number;
  };

  @Prop({ type: Object })
  products: {
    topSellers: Record<string, number>;
    topViewed: Record<string, number>;
    abandonedCarts: number;
  };

  @Prop({ type: Object })
  userEngagement: {
    avgTimeOnSite: number;
    pagesPerSession: number;
    searchUsage: number;
  };
}

export const MetricsSummarySchema = SchemaFactory.createForClass(MetricsSummary);
