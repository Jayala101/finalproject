import { PartialType } from '@nestjs/mapped-types';
import { CreateMarketingCampaignDto } from './create-marketing-campaign.dto';
import { IsObject, IsOptional } from 'class-validator';

class CampaignMetricsDto {
  impressions?: number;
  clicks?: number;
  conversions?: number;
  revenue?: number;
}

export class UpdateMarketingCampaignDto extends PartialType(CreateMarketingCampaignDto) {
  @IsObject()
  @IsOptional()
  metrics?: CampaignMetricsDto;
}
