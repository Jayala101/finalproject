import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.wishlistsService.findByUser(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.removeById(id);
  }

  @Delete('user/:userId/product/:productId')
  removeByUserAndProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.wishlistsService.remove(userId, productId);
  }
}
