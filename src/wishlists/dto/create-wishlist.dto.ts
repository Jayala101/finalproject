import { IsUUID } from 'class-validator';

export class CreateWishlistDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  product_id: string;
}
