import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | null> {
    try {
      const product = this.productsRepository.create({
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        sku: createProductDto.sku,
        stock_quantity: createProductDto.stock_quantity || 0,
        category_id: createProductDto.category_id,
      });
      return await this.productsRepository.save(product);
    } catch (err) {
      console.error('Error creating product:', err);
      return null;
    }
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Product> | null> {
    try {
      const queryBuilder = this.productsRepository.createQueryBuilder('product');
      queryBuilder.leftJoinAndSelect('product.category', 'category');
      return await paginate<Product>(queryBuilder, options);
    } catch (err) {
      console.error('Error fetching products:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      return await this.productsRepository.findOne({ where: { id }, relations: ['category'] });
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  }

  async update(id: string, dto: CreateProductDto): Promise<Product | null> {
    try {
      const product = await this.findOne(id);
      if (!product) return null;

      product.name = dto.name ?? product.name;
      product.description = dto.description ?? product.description;
      product.price = dto.price ?? product.price;
      product.sku = dto.sku ?? product.sku;
      product.stock_quantity = dto.stock_quantity ?? product.stock_quantity;
      product.category_id = dto.category_id ?? product.category_id;

      return await this.productsRepository.save(product);
    } catch (err) {
      console.error('Error updating product:', err);
      return null;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const result = await this.productsRepository.delete(id);
      return result.affected !== 0;
    } catch (err) {
      console.error('Error deleting product:', err);
      return false;
    }
  }
}
