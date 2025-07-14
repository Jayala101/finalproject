import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UsersModule } from '../../postgres-modules/users/users.module';
import { CategoriesModule } from '../../postgres-modules/categories/categories.module';
import { ProductsModule } from '../../postgres-modules/products/products.module';
import { DiscountsModule } from '../../postgres-modules/discounts/discounts.module';
import { PostgresSeedsService } from './postgres-seeds/postgres-seeds.service';
import { MongoSeedsService } from './mongo-seeds/mongo-seeds.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    CategoriesModule, 
    ProductsModule,
    DiscountsModule,
    MongooseModule.forFeature([])
  ],
  controllers: [SeedController],
  providers: [SeedService, PostgresSeedsService, MongoSeedsService],
  exports: [SeedService, PostgresSeedsService, MongoSeedsService],
})
export class SeedModule {}
