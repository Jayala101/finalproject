import { IsString, IsNotEmpty, IsOptional, IsDate, IsBoolean, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  referrer?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  startTime?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  endTime?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
