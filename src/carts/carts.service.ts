import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
  ) {}

  async findOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartsRepository.findOne({
      where: { user_id: userId },
      relations: ['cartItems', 'cartItems.product'],
    });

    if (!cart) {
      cart = this.cartsRepository.create({ user_id: userId });
      cart = await this.cartsRepository.save(cart);
    }

    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const cart = await this.findOrCreateCart(userId);
    
    // Check if item already exists in cart
    const existingItem = await this.cartItemsRepository.findOne({
      where: { cart_id: cart.id, product_id: addToCartDto.product_id },
    });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += addToCartDto.quantity;
      await this.cartItemsRepository.save(existingItem);
    } else {
      // Create new cart item
      const cartItem = this.cartItemsRepository.create({
        cart_id: cart.id,
        product_id: addToCartDto.product_id,
        quantity: addToCartDto.quantity,
      });
      await this.cartItemsRepository.save(cartItem);
    }

    return this.findOrCreateCart(userId);
  }

  async updateCartItem(cartItemId: string, updateCartItemDto: UpdateCartItemDto): Promise<void> {
    await this.cartItemsRepository.update(cartItemId, updateCartItemDto);
  }

  async removeFromCart(cartItemId: string): Promise<void> {
    await this.cartItemsRepository.delete(cartItemId);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.cartsRepository.findOne({ where: { user_id: userId } });
    if (cart) {
      await this.cartItemsRepository.delete({ cart_id: cart.id });
    }
  }
}
