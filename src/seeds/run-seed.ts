import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { AdminSeedService } from './admin.seed';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const adminSeedService = app.get(AdminSeedService);
  
  console.log('🌱 Running admin seed...');
  await adminSeedService.createDefaultAdmin();
  
  await app.close();
  console.log('✅ Seed completed');
}

runSeed().catch(console.error);
