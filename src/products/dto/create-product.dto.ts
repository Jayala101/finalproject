import { IsString, IsNotEmpty, IsUUID, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsInt()
  @IsOptional()
  stock_quantity?: number;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
