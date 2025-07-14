import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsString, IsUUID, IsDate, Min } from 'class-validator';
import { ShippingMethod, ShippingStatus } from '../entities/shipping.entity';
import { Type } from 'class-transformer';

export class CreateShippingDto {
  @IsEnum(ShippingMethod)
  @IsNotEmpty()
  method: ShippingMethod;

  @IsEnum(ShippingStatus)
  @IsOptional()
  status?: ShippingStatus;

  @IsString()
  @IsOptional()
  trackingNumber?: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  estimatedDeliveryDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  actualDeliveryDate?: Date;

  @IsNumber()
  @Min(0)
  @IsOptional()
  shippingCost?: number;

  @IsOptional()
  shippingDetails?: Record<string, any>;

  @IsUUID()
  @IsNotEmpty()
  orderId: string;
}
