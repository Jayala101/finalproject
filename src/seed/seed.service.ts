import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/products.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async seedDatabase(): Promise<{ message: string; data: any }> {
    try {
      // Clear existing data
      await this.productsRepository.delete({});
      await this.categoriesRepository.delete({});

      // Create sample categories
      const categories = [
        { name: 'Electronics', description: 'Electronic devices and gadgets' },
        { name: 'Clothing', description: 'Fashion and apparel' },
        { name: 'Books', description: 'Books and literature' },
        { name: 'Home & Garden', description: 'Home and garden supplies' },
        { name: 'Sports', description: 'Sports and outdoor equipment' },
      ];

      const savedCategories: Category[] = [];
      for (const cat of categories) {
        const category = this.categoriesRepository.create(cat);
        const saved = await this.categoriesRepository.save(category);
        savedCategories.push(saved);
      }

      // Create sample products
      const products = [
        {
          name: 'Wireless Bluetooth Headphones',
          description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
          price: 99.99,
          sku: 'WBH001',
          stock_quantity: 50,
          category_id: savedCategories[0].id,
        },
        {
          name: 'Smart Watch',
          description: 'Feature-rich smartwatch with fitness tracking, notifications, and long battery life. Compatible with iOS and Android.',
          price: 199.99,
          sku: 'SW001',
          stock_quantity: 30,
          category_id: savedCategories[0].id,
        },
        {
          name: 'Laptop Stand',
          description: 'Adjustable aluminum laptop stand for better ergonomics and cooling. Compatible with all laptop sizes.',
          price: 49.99,
          sku: 'LS001',
          stock_quantity: 75,
          category_id: savedCategories[0].id,
        },
        {
          name: 'Cotton T-Shirt',
          description: 'Comfortable 100% cotton t-shirt available in multiple colors. Perfect for casual wear.',
          price: 19.99,
          sku: 'CT001',
          stock_quantity: 100,
          category_id: savedCategories[1].id,
        },
        {
          name: 'Denim Jeans',
          description: 'Classic blue denim jeans with modern fit. Durable and stylish for everyday wear.',
          price: 59.99,
          sku: 'DJ001',
          stock_quantity: 60,
          category_id: savedCategories[1].id,
        },
        {
          name: 'Winter Jacket',
          description: 'Warm and waterproof winter jacket with insulation. Perfect for cold weather activities.',
          price: 129.99,
          sku: 'WJ001',
          stock_quantity: 25,
          category_id: savedCategories[1].id,
        },
        {
          name: 'JavaScript: The Good Parts',
          description: 'Essential book for JavaScript developers. Learn the best practices and avoid common pitfalls.',
          price: 29.99,
          sku: 'JSB001',
          stock_quantity: 40,
          category_id: savedCategories[2].id,
        },
        {
          name: 'Python Programming Guide',
          description: 'Comprehensive guide to Python programming for beginners and advanced users.',
          price: 39.99,
          sku: 'PPG001',
          stock_quantity: 35,
          category_id: savedCategories[2].id,
        },
        {
          name: 'Coffee Maker',
          description: 'Programmable coffee maker with 12-cup capacity. Perfect for coffee enthusiasts.',
          price: 79.99,
          sku: 'CM001',
          stock_quantity: 20,
          category_id: savedCategories[3].id,
        },
        {
          name: 'Indoor Plant Pot',
          description: 'Decorative ceramic plant pot with drainage holes. Perfect for indoor plants.',
          price: 24.99,
          sku: 'IPP001',
          stock_quantity: 80,
          category_id: savedCategories[3].id,
        },
        {
          name: 'Yoga Mat',
          description: 'Non-slip yoga mat with extra cushioning. Perfect for yoga, pilates, and fitness exercises.',
          price: 34.99,
          sku: 'YM001',
          stock_quantity: 45,
          category_id: savedCategories[4].id,
        },
        {
          name: 'Basketball',
          description: 'Official size basketball with premium leather construction. Perfect for indoor and outdoor play.',
          price: 29.99,
          sku: 'BB001',
          stock_quantity: 55,
          category_id: savedCategories[4].id,
        },
      ];

      const savedProducts: Product[] = [];
      for (const prod of products) {
        const product = this.productsRepository.create(prod);
        const saved = await this.productsRepository.save(product);
        savedProducts.push(saved);
      }

      return {
        message: 'Database seeded successfully',
        data: {
          categories: savedCategories.length,
          products: savedProducts.length,
        },
      };
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  }
}
