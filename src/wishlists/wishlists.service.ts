import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    // Check if item already in wishlist
    const existing = await this.wishlistsRepository.findOne({
      where: {
        user_id: createWishlistDto.user_id,
        product_id: createWishlistDto.product_id,
      },
    });

    if (existing) {
      throw new Error('Product already in wishlist');
    }

    const wishlist = this.wishlistsRepository.create(createWishlistDto);
    return this.wishlistsRepository.save(wishlist);
  }

  async findByUser(userId: string): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({
      where: { user_id: userId },
      relations: ['product'],
    });
  }

  async remove(userId: string, productId: string): Promise<void> {
    await this.wishlistsRepository.delete({
      user_id: userId,
      product_id: productId,
    });
  }

  async removeById(id: string): Promise<void> {
    await this.wishlistsRepository.delete(id);
  }
}
