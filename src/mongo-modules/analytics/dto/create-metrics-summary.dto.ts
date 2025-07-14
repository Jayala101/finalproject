import { IsDate, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';

class DailyVisitorsDto {
  total?: number;
  unique?: number;
  newUsers?: number;
  returningUsers?: number;
}

class TrafficDto {
  pageviews?: number;
  bounceRate?: number;
  avgSessionDuration?: number;
  topReferrers?: Record<string, number>;
}

class SalesDto {
  revenue?: number;
  transactions?: number;
  avgOrderValue?: number;
  conversionRate?: number;
}

class ProductsDto {
  topSellers?: Record<string, number>;
  topViewed?: Record<string, number>;
  abandonedCarts?: number;
}

class UserEngagementDto {
  avgTimeOnSite?: number;
  pagesPerSession?: number;
  searchUsage?: number;
}

export class CreateMetricsSummaryDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => DailyVisitorsDto)
  @IsOptional()
  dailyVisitors?: DailyVisitorsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => TrafficDto)
  @IsOptional()
  traffic?: TrafficDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SalesDto)
  @IsOptional()
  sales?: SalesDto;

  @IsObject()
  @ValidateNested()
  @Type(() => ProductsDto)
  @IsOptional()
  products?: ProductsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UserEngagementDto)
  @IsOptional()
  userEngagement?: UserEngagementDto;
}
