import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductViewDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsOptional()
  sessionId?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  timestamp?: Date;
}
