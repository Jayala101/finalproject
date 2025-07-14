import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDescription, ProductDescriptionSchema } from './schemas/product-description.schema';
import { ProductTag, ProductTagSchema } from './schemas/product-tag.schema';
import { ProductContentService } from './product-content.service';
import { ProductContentController } from './product-content.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDescription.name, schema: ProductDescriptionSchema },
      { name: ProductTag.name, schema: ProductTagSchema },
    ]),
  ],
  controllers: [ProductContentController],
  providers: [ProductContentService],
  exports: [ProductContentService],
})
export class ProductContentModule {}
