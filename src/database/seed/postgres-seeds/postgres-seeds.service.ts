import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../postgres-modules/users/users.service';
import { CategoriesService } from '../../../postgres-modules/categories/categories.service';
import { ProductsService } from '../../../postgres-modules/products/products.service';
import { DiscountsService } from '../../../postgres-modules/discounts/discounts.service';
import { Role } from '../../../core/roles/role.enum';
import { DiscountType } from '../../../postgres-modules/discounts/entities/discount.entity';

@Injectable()
export class PostgresSeedsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly discountsService: DiscountsService,
  ) {}

  async seedAll(): Promise<void> {
    console.log('  📋 Seeding users...');
    await this.seedUsers();
    
    console.log('  📂 Seeding categories...');
    await this.seedCategories();
    
    console.log('  📦 Seeding products...');
    await this.seedProducts();
    
    console.log('  🎫 Seeding discounts...');
    await this.seedDiscounts();
  }

  private async seedUsers(): Promise<void> {
    const users = [
      {
        username: 'admin',
        email: 'admin@ecommerce.com',
        password: 'admin123456',
        roles: [Role.ADMIN]
      },
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
        roles: [Role.USER]
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password123',
        roles: [Role.USER]
      },
      {
        username: 'moderator',
        email: 'mod@ecommerce.com',
        password: 'mod123456',
        roles: [Role.MODERATOR]
      },
      {
        username: 'alice_wilson',
        email: 'alice@example.com',
        password: 'password123',
        roles: [Role.USER]
      }
    ];

    for (const userData of users) {
      try {
        const existingUser = await this.usersService.findByEmail(userData.email);
        if (!existingUser) {
          await this.usersService.create(userData);
          console.log(`    ✓ Created user: ${userData.username}`);
        } else {
          console.log(`    - User already exists: ${userData.username}`);
        }
      } catch (error) {
        console.log(`    ✗ Failed to create user ${userData.username}: ${error.message}`);
      }
    }
  }

  private async seedCategories(): Promise<void> {
    const categories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets'
      },
      {
        name: 'Computers',
        description: 'Laptops, desktops, and computer accessories'
      },
      {
        name: 'Smartphones',
        description: 'Mobile phones and accessories'
      },
      {
        name: 'Home & Garden',
        description: 'Home improvement and garden supplies'
      },
      {
        name: 'Clothing',
        description: 'Fashion and apparel for all ages'
      },
      {
        name: 'Books',
        description: 'Physical and digital books'
      },
      {
        name: 'Sports',
        description: 'Sports equipment and fitness gear'
      },
      {
        name: 'Toys',
        description: 'Toys and games for children'
      }
    ];

    for (const categoryData of categories) {
      try {
        const existingCategory = await this.categoriesService.findByName(categoryData.name);
        if (!existingCategory) {
          const category = await this.categoriesService.create(categoryData);
          console.log(`    ✓ Created category: ${category.name}`);
        } else {
          console.log(`    - Category already exists: ${categoryData.name}`);
        }
      } catch (error) {
        console.log(`    ✗ Failed to create category ${categoryData.name}: ${error.message}`);
      }
    }
  }

  private async seedProducts(): Promise<void> {
    // First get categories to link products
    const categories = await this.categoriesService.findAll();
    const categoryMap = categories.reduce((map, cat) => {
      map[cat.name] = cat.id;
      return map;
    }, {} as Record<string, string>);

    const products = [
      // Electronics
      {
        name: 'iPhone 15 Pro',
        description: 'Latest Apple smartphone with advanced features',
        price: 999.99,
        stock: 50,
        sku: 'IPHONE15PRO',
        weight: 0.2,
        categoryId: categoryMap['Smartphones'],
        image: 'iphone15pro.jpg'
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone with excellent camera',
        price: 899.99,
        stock: 75,
        sku: 'GALAXYS24',
        weight: 0.18,
        categoryId: categoryMap['Smartphones'],
        image: 'galaxy-s24.jpg'
      },
      
      // Computers
      {
        name: 'MacBook Pro 16"',
        description: 'Professional laptop for creative work',
        price: 2499.99,
        stock: 25,
        sku: 'MBP16',
        weight: 2.1,
        categoryId: categoryMap['Computers'],
        image: 'macbook-pro.jpg'
      },
      {
        name: 'Dell XPS 13',
        description: 'Ultrabook with excellent build quality',
        price: 1299.99,
        stock: 30,
        sku: 'DELLXPS13',
        weight: 1.2,
        categoryId: categoryMap['Computers'],
        image: 'dell-xps13.jpg'
      },
      
      // Electronics
      {
        name: 'Sony WH-1000XM5',
        description: 'Noise-canceling wireless headphones',
        price: 399.99,
        stock: 100,
        sku: 'SONYWH1000XM5',
        weight: 0.25,
        categoryId: categoryMap['Electronics'],
        image: 'sony-headphones.jpg'
      },
      {
        name: 'Apple Watch Series 9',
        description: 'Advanced smartwatch with health monitoring',
        price: 499.99,
        stock: 60,
        sku: 'APPLEWATCH9',
        weight: 0.05,
        categoryId: categoryMap['Electronics'],
        image: 'apple-watch.jpg'
      },
      
      // Clothing
      {
        name: 'Nike Air Max 90',
        description: 'Classic sneakers with modern comfort',
        price: 129.99,
        stock: 200,
        sku: 'NIKEAIRMAX90',
        weight: 0.8,
        categoryId: categoryMap['Clothing'],
        image: 'nike-airmax.jpg'
      },
      {
        name: 'Levi\'s 501 Jeans',
        description: 'Original fit jeans in classic blue',
        price: 89.99,
        stock: 150,
        sku: 'LEVIS501',
        weight: 0.6,
        categoryId: categoryMap['Clothing'],
        image: 'levis-jeans.jpg'
      },
      
      // Books
      {
        name: 'Clean Code',
        description: 'A handbook of agile software craftsmanship',
        price: 49.99,
        stock: 75,
        sku: 'CLEANCODE',
        weight: 0.7,
        categoryId: categoryMap['Books'],
        image: 'clean-code.jpg'
      },
      
      // Home & Garden
      {
        name: 'Dyson V15 Detect',
        description: 'Cordless vacuum with laser detection',
        price: 749.99,
        stock: 40,
        sku: 'DYSONV15',
        weight: 3.0,
        categoryId: categoryMap['Home & Garden'],
        image: 'dyson-vacuum.jpg'
      }
    ];

    for (const productData of products) {
      try {
        if (productData.categoryId) {
          const product = await this.productsService.create(productData);
          console.log(`    ✓ Created product: ${product.name}`);
        } else {
          console.log(`    - Skipping product ${productData.name} (category not found)`);
        }
      } catch (error) {
        console.log(`    ✗ Failed to create product ${productData.name}: ${error.message}`);
      }
    }
  }

  private async seedDiscounts(): Promise<void> {
    const discounts = [
      {
        name: 'Welcome Discount',
        code: 'WELCOME10',
        description: '10% off for new customers',
        type: DiscountType.PERCENTAGE,
        value: 10,
        minimumOrderAmount: 50,
        maximumDiscountAmount: 100,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        active: true,
        usageLimit: 1000,
        usageCount: 0
      },
      {
        name: 'Save Fifty',
        code: 'SAVE50',
        description: '$50 off orders over $200',
        type: DiscountType.FIXED_AMOUNT,
        value: 50,
        minimumOrderAmount: 200,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        active: true,
        usageLimit: 500,
        usageCount: 0
      },
      {
        name: 'Electronics Sale',
        code: 'ELECTRONICS15',
        description: '15% off electronics',
        type: DiscountType.PERCENTAGE,
        value: 15,
        minimumOrderAmount: 100,
        maximumDiscountAmount: 200,
        startDate: new Date(),
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
        active: true,
        usageLimit: 200,
        usageCount: 0
      }
    ];

    for (const discountData of discounts) {
      try {
        const discount = await this.discountsService.create(discountData);
        console.log(`    ✓ Created discount: ${discount.code}`);
      } catch (error) {
        console.log(`    ✗ Failed to create discount ${discountData.code}: ${error.message}`);
      }
    }
  }
}
