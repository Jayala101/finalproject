import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageView, PageViewSchema } from './schemas/page-view.schema';
import { ConversionEvent, ConversionEventSchema } from './schemas/conversion-event.schema';
import { MetricsSummary, MetricsSummarySchema } from './schemas/metrics-summary.schema';
import { ProductView, ProductViewSchema } from './schemas/product-view.schema';
import { CategoryView, CategoryViewSchema } from './schemas/category-view.schema';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageView.name, schema: PageViewSchema },
      { name: ConversionEvent.name, schema: ConversionEventSchema },
      { name: MetricsSummary.name, schema: MetricsSummarySchema },
      { name: ProductView.name, schema: ProductViewSchema },
      { name: CategoryView.name, schema: CategoryViewSchema },
    ]),
  ],
  controllers: [],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
