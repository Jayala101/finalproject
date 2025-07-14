import { IsString, IsNotEmpty, IsNumber, IsOptional, IsObject, IsArray, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CartItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsObject()
  @IsOptional()
  selectedOptions?: Record<string, string>;

  @IsNumber()
  @IsOptional()
  @Min(0)
  price?: number;
}

export class CreateShoppingCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  @IsOptional()
  items?: CartItemDto[];

  @IsString()
  @IsOptional()
  couponCode?: string;

  // CRUD Methods
  static create(data: Partial<CreateShoppingCartDto>): CreateShoppingCartDto {
    const cart = new CreateShoppingCartDto();
    Object.assign(cart, {
      items: [],
      ...data
    });
    return cart;
  }

  toObject(): Record<string, any> {
    return {
      userId: this.userId,
      items: this.items || [],
      lastUpdated: new Date(),
      couponCode: this.couponCode,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  addItem(item: CartItemDto): void {
    if (!this.items) this.items = [];
    
    const existingIndex = this.items.findIndex(i => i.productId === item.productId);
    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  removeItem(productId: string): void {
    if (this.items) {
      this.items = this.items.filter(item => item.productId !== productId);
    }
  }

  updateItemQuantity(productId: string, quantity: number): void {
    if (this.items) {
      const item = this.items.find(i => i.productId === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = quantity;
        }
      }
    }
  }

  clearCart(): void {
    this.items = [];
    this.couponCode = undefined;
  }

  getTotalItems(): number {
    return this.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }

  getTotalPrice(): number {
    return this.items?.reduce((total, item) => total + (item.price || 0) * item.quantity, 0) || 0;
  }

  applyCoupon(couponCode: string): void {
    this.couponCode = couponCode;
  }

  validate(): boolean {
    return !!(this.userId);
  }
}
