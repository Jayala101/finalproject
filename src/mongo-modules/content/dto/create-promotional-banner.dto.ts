import { IsString, IsNotEmpty, IsOptional, IsDate, IsBoolean, IsNumber, IsArray, IsObject, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePromotionalBannerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsString()
  @IsOptional()
  linkUrl?: string;

  @IsString()
  @IsOptional()
  buttonText?: string;

  @IsString()
  @IsOptional()
  @IsIn(['header', 'sidebar', 'footer', 'popup', 'hero', 'inline'])
  position?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsArray()
  @IsOptional()
  targetPages?: string[];

  @IsObject()
  @IsOptional()
  styles?: Record<string, any>;

  @IsString()
  @IsOptional()
  campaignId?: string;
}
