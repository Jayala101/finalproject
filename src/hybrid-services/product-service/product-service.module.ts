import { Module } from '@nestjs/common';
import { ProductsModule } from '../../postgres-modules/products/products.module';
import { ProductContentModule } from '../../mongo-modules/product-content/product-content.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    ProductsModule, // PostgreSQL product module
    ProductContentModule, // MongoDB product content module
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductServiceModule {}
