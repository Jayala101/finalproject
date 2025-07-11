import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('user/:userId')
  getCart(@Param('userId') userId: string) {
    return this.cartsService.findOrCreateCart(userId);
  }

  @Post('user/:userId/items')
  addToCart(@Param('userId') userId: string, @Body() addToCartDto: AddToCartDto) {
    return this.cartsService.addToCart(userId, addToCartDto);
  }

  @Patch('items/:itemId')
  updateCartItem(@Param('itemId') itemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartsService.updateCartItem(itemId, updateCartItemDto);
  }

  @Delete('items/:itemId')
  removeFromCart(@Param('itemId') itemId: string) {
    return this.cartsService.removeFromCart(itemId);
  }

  @Delete('user/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartsService.clearCart(userId);
  }
}
