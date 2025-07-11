import { IsNotEmpty, IsUUID, IsNumber, IsEnum, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../order.entity';

export class CreateOrderItemDto {
  @IsUUID()
  product_id: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price_at_purchase: number;
}

export class CreateOrderDto {
  @IsUUID()
  user_id: string;

  @IsNumber()
  total_amount: number;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  shipping_address: string;

  @IsString()
  @IsNotEmpty()
  billing_address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
