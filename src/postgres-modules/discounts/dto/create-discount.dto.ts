import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsString, IsBoolean, IsDate, IsArray, IsUUID, Min, Max, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { DiscountType } from '../entities/discount.entity';

export class CreateDiscountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  code: string;

  @IsEnum(DiscountType)
  @IsNotEmpty()
  type: DiscountType;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @IsOptional()
  usageLimit?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minimumOrderAmount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maximumDiscountAmount?: number;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  productIds?: string[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  categoryIds?: string[];
}
