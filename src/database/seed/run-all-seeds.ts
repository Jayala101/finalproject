import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { PostgresSeedsService } from './postgres-seeds/postgres-seeds.service';
import { MongoSeedsService } from './mongo-seeds/mongo-seeds.service';

async function runAllSeeds() {
  console.log('🌱 Starting database seeding process...\n');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    // Initialize seed services
    const postgresSeedsService = app.get(PostgresSeedsService);
    const mongoSeedsService = app.get(MongoSeedsService);

    // Seed PostgreSQL first (core data)
    console.log('📊 Seeding PostgreSQL database...');
    await postgresSeedsService.seedAll();
    console.log('✅ PostgreSQL seeding completed\n');

    // Seed MongoDB second (dependent data)
    console.log('🍃 Seeding MongoDB database...');
    await mongoSeedsService.seedAll();
    console.log('✅ MongoDB seeding completed\n');

    console.log('🎉 All database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    console.error(error.stack);
  } finally {
    await app.close();
  }
}

// Run the seed if this file is executed directly
if (require.main === module) {
  runAllSeeds();
}

export { runAllSeeds };
