import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber, IsObject, IsArray, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateConversionEventDto {
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  sessionId?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;

  @IsNumber()
  @IsOptional()
  @Min(0)
  value?: number;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsArray()
  @IsOptional()
  conversionPath?: string[];

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  campaign?: string;
}
