import { IsString, IsNotEmpty, IsOptional, IsDate, IsObject, IsArray, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';

class CampaignContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  callToAction: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}

class CampaignTargetingDto {
  @IsArray()
  @IsOptional()
  userSegments?: string[];

  @IsObject()
  @IsOptional()
  demographics?: Record<string, any>;

  @IsArray()
  @IsOptional()
  interests?: string[];
}

class CampaignMetricsDto {
  @IsOptional()
  impressions?: number;

  @IsOptional()
  clicks?: number;

  @IsOptional()
  conversions?: number;

  @IsOptional()
  revenue?: number;
}

export class CreateMarketingCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['email', 'social', 'banner', 'push', 'sms'])
  type: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @IsString()
  @IsOptional()
  @IsIn(['draft', 'active', 'paused', 'completed'])
  status?: string;

  @IsObject()
  @Type(() => CampaignContentDto)
  @IsOptional()
  content?: CampaignContentDto;

  @IsObject()
  @Type(() => CampaignTargetingDto)
  @IsOptional()
  targeting?: CampaignTargetingDto;

  @IsArray()
  @IsOptional()
  productIds?: string[];
}
