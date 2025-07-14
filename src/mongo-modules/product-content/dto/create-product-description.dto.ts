import { IsString, IsArray, IsOptional, ValidateNested, IsObject, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDescriptionDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsObject()
  @IsOptional()
  specifications?: Record<string, string>;

  @IsArray()
  @IsOptional()
  seoKeywords?: string[];

  @IsString()
  @IsOptional()
  seoDescription?: string;
}
