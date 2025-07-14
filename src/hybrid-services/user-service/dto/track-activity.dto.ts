import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';

export class TrackActivityDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}
