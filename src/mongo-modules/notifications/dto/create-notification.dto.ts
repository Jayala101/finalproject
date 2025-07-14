import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsObject, IsDateString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsBoolean()
  @IsOptional()
  read?: boolean;

  @IsString()
  @IsOptional()
  type?: string;

  @IsObject()
  @IsOptional()
  data?: Record<string, any>;

  @IsDateString()
  @IsOptional()
  expiresAt?: Date;
}
