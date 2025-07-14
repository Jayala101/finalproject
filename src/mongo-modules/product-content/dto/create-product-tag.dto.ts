import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductTagDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  tagName: string;

  @IsString()
  @IsOptional()
  tagType?: string;

  @IsNumber()
  @IsOptional()
  relevanceScore?: number;
}
