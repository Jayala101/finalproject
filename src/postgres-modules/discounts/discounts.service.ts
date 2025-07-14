import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Raw } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const { productIds, categoryIds, ...discountData } = createDiscountDto;
    
    const discount = this.discountRepository.create(discountData);
    
    if (productIds && productIds.length > 0) {
      const products = await this.productsService.findByIds(productIds);
      discount.products = products;
    }
    
    if (categoryIds && categoryIds.length > 0) {
      const categories = await this.categoriesService.findByIds(categoryIds);
      discount.categories = categories;
    }
    
    return this.discountRepository.save(discount);
  }

  async findAll(): Promise<Discount[]> {
    return this.discountRepository.find({
      relations: ['products', 'categories']
    });
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.discountRepository.findOne({
      where: { id },
      relations: ['products', 'categories']
    });
    
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    
    return discount;
  }

  async findByCode(code: string): Promise<Discount> {
    const discount = await this.discountRepository.findOne({
      where: { code },
      relations: ['products', 'categories']
    });
    
    if (!discount) {
      throw new NotFoundException(`Discount with code ${code} not found`);
    }
    
    return discount;
  }

  async findActiveDiscounts(): Promise<Discount[]> {
    const currentDate = new Date();
    
    return this.discountRepository.find({
      where: [
        {
          active: true,
          startDate: Raw(alias => `${alias} IS NULL`),
          endDate: Raw(alias => `${alias} IS NULL`),
        },
        {
          active: true,
          startDate: Raw(alias => `${alias} IS NULL`),
          endDate: Raw(alias => `${alias} > :currentDate`, { currentDate }),
        },
        {
          active: true,
          startDate: Raw(alias => `${alias} < :currentDate`, { currentDate }),
          endDate: Raw(alias => `${alias} IS NULL`),
        },
        {
          active: true,
          startDate: Raw(alias => `${alias} < :currentDate`, { currentDate }),
          endDate: Raw(alias => `${alias} > :currentDate`, { currentDate }),
        },
      ],
      relations: ['products', 'categories']
    });
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto): Promise<Discount> {
    const { productIds, categoryIds, ...discountData } = updateDiscountDto;
    
    const discount = await this.findOne(id);
    
    if (productIds) {
      const products = await this.productsService.findByIds(productIds);
      discount.products = products;
    }
    
    if (categoryIds) {
      const categories = await this.categoriesService.findByIds(categoryIds);
      discount.categories = categories;
    }
    
    Object.assign(discount, discountData);
    
    return this.discountRepository.save(discount);
  }

  async incrementUsageCount(id: string): Promise<Discount> {
    const discount = await this.findOne(id);
    discount.usageCount += 1;
    return this.discountRepository.save(discount);
  }

  async remove(id: string): Promise<void> {
    const discount = await this.findOne(id);
    await this.discountRepository.remove(discount);
  }

  async validateDiscount(code: string, amount: number): Promise<{ valid: boolean; discount: Discount | null }> {
    try {
      const discount = await this.findByCode(code);
      const currentDate = new Date();
      
      if (!discount.active) {
        return { valid: false, discount };
      }
      
      if (discount.startDate && discount.startDate > currentDate) {
        return { valid: false, discount };
      }
      
      if (discount.endDate && discount.endDate < currentDate) {
        return { valid: false, discount };
      }
      
      if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
        return { valid: false, discount };
      }
      
      if (discount.minimumOrderAmount && amount < discount.minimumOrderAmount) {
        return { valid: false, discount };
      }
      
      return { valid: true, discount };
    } catch (error) {
      return { valid: false, discount: null };
    }
  }
}
