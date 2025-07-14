import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationMongoDto } from '../../common/dto/pagination-mongo.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: any): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    const savedProduct = await this.productsRepository.save(product);
    return Array.isArray(savedProduct) ? savedProduct[0] : savedProduct;
  }

  async findAll(query: any = {}): Promise<{ items: Product[], meta: any }> {
    const { page = 1, limit = 10, ...filters } = query;
    
    const skip = (page - 1) * limit;
    
    // Build query with filters
    const queryBuilder = this.productsRepository.createQueryBuilder('product');
    
    // Apply filters if they exist
    if (filters.name) {
      queryBuilder.andWhere('product.name ILIKE :name', { name: `%${filters.name}%` });
    }
    
    if (filters.categoryId) {
      queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId: filters.categoryId });
    }
    
    if (filters.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
    }
    
    if (filters.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }
    
    if (filters.isActive !== undefined) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive: filters.isActive });
    }
    
    // Get total count for pagination
    const total = await queryBuilder.getCount();
    
    // Apply pagination
    queryBuilder.skip(skip).take(limit);
    
    // Add sorting
    queryBuilder.orderBy('product.createdAt', 'DESC');
    
    // Execute query
    const items = await queryBuilder.getMany();
    
    // Return items with pagination metadata
    return {
      items,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
      }
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    const product = await this.findOne(id);
    
    Object.assign(product, updateProductDto);
    
    return this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
  
  async findByIds(ids: string[]): Promise<Product[]> {
    if (!ids.length) return [];
    return this.productsRepository.findByIds(ids);
  }
  
  async findByCategoryId(categoryId: string, limit: number = 10): Promise<Product[]> {
    return this.productsRepository.find({ 
      where: { categoryId },
      take: limit,
      order: { createdAt: 'DESC' }
    });
  }

  /**
   * Update product stock
   */
  async updateStock(id: string, stock: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock = stock;
    return this.productsRepository.save(product);
  }

  /**
   * Find products with low stock
   */
  async findLowStock(threshold: number = 10): Promise<Product[]> {
    return this.productsRepository.find({
      where: {
        stock: threshold // Note: TypeORM doesn't have direct LessThanOrEqual in find, using queryBuilder below
      }
    });
  }

  /**
   * Better implementation for low stock using query builder
   */
  async findLowStockProducts(threshold: number = 10): Promise<Product[]> {
    return this.productsRepository
      .createQueryBuilder('product')
      .where('product.stock <= :threshold', { threshold })
      .andWhere('product.isActive = :isActive', { isActive: true })
      .orderBy('product.stock', 'ASC')
      .getMany();
  }
}
