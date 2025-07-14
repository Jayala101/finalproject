import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from './schemas/blog-post.schema';
import { MarketingCampaign, MarketingCampaignSchema } from './schemas/marketing-campaign.schema';
import { PromotionalBanner, PromotionalBannerSchema } from './schemas/promotional-banner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogPost.name, schema: BlogPostSchema },
      { name: MarketingCampaign.name, schema: MarketingCampaignSchema },
      { name: PromotionalBanner.name, schema: PromotionalBannerSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ContentModule {}
