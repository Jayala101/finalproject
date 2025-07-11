import { IsUUID, IsNumber, IsOptional, IsInt } from 'class-validator';

export class AddToCartDto {
  @IsUUID()
  product_id: string;

  @IsInt()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsInt()
  @IsOptional()
  quantity?: number;
}
