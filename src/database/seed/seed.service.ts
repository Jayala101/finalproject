import { Injectable } from '@nestjs/common';
import { PostgresSeedsService } from './postgres-seeds/postgres-seeds.service';
import { MongoSeedsService } from './mongo-seeds/mongo-seeds.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly postgresSeedsService: PostgresSeedsService,
    private readonly mongoSeedsService: MongoSeedsService,
  ) {}

  async seedAll(): Promise<{ message: string; details: any }> {
    try {
      console.log('🌱 Starting database seeding...\n');

      console.log('📊 Seeding PostgreSQL database...');
      await this.postgresSeedsService.seedAll();
      console.log('✅ PostgreSQL seeding completed!\n');

      console.log('🍃 Seeding MongoDB database...');
      await this.mongoSeedsService.seedAll();
      console.log('✅ MongoDB seeding completed!\n');

      console.log('🎉 All database seeding completed successfully!');

      return {
        message: 'Database seeding completed successfully',
        details: {
          postgres: 'Seeded users, categories, products, and discounts',
          mongodb: 'Seeded user behavior, reviews, analytics, product content, notifications, and session data'
        }
      };
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw new Error(`Database seeding failed: ${error.message}`);
    }
  }

  async seedPostgres(): Promise<{ message: string }> {
    try {
      console.log('📊 Seeding PostgreSQL database...');
      await this.postgresSeedsService.seedAll();
      console.log('✅ PostgreSQL seeding completed!');

      return { message: 'PostgreSQL seeding completed successfully' };
    } catch (error) {
      console.error('❌ PostgreSQL seeding failed:', error);
      throw new Error(`PostgreSQL seeding failed: ${error.message}`);
    }
  }

  async seedMongo(): Promise<{ message: string }> {
    try {
      console.log('🍃 Seeding MongoDB database...');
      await this.mongoSeedsService.seedAll();
      console.log('✅ MongoDB seeding completed!');

      return { message: 'MongoDB seeding completed successfully' };
    } catch (error) {
      console.error('❌ MongoDB seeding failed:', error);
      throw new Error(`MongoDB seeding failed: ${error.message}`);
    }
  }
}
