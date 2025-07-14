import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductContentService } from './product-content.service';
import { ProductDescription } from './schemas/product-description.schema';
import { ProductTag } from './schemas/product-tag.schema';

@Controller('product-content')
export class ProductContentController {
  constructor(private readonly productContentService: ProductContentService) {}

  @Post('descriptions')
  async createProductDescription(@Body() createProductDescriptionDto: any): Promise<ProductDescription> {
    return this.productContentService.createProductDescription(createProductDescriptionDto);
  }

  @Get('descriptions')
  async findAllProductDescriptions(): Promise<ProductDescription[]> {
    return this.productContentService.findAllProductDescriptions();
  }

  @Get('descriptions/:id')
  async findProductDescriptionById(@Param('id') id: string): Promise<ProductDescription | null> {
    return this.productContentService.findProductDescriptionById(id);
  }

  @Get('descriptions/product/:productId')
  async findProductDescriptionsByProductId(@Param('productId') productId: string): Promise<ProductDescription[]> {
    return this.productContentService.findProductDescriptionsByProductId(productId);
  }

  @Post('tags')
  async createProductTag(@Body() createProductTagDto: any): Promise<ProductTag> {
    return this.productContentService.createProductTag(createProductTagDto);
  }

  @Get('tags')
  async findAllProductTags(): Promise<ProductTag[]> {
    return this.productContentService.findAllProductTags();
  }

  @Get('tags/product/:productId')
  async findProductTagsByProductId(@Param('productId') productId: string): Promise<ProductTag[]> {
    return this.productContentService.findProductTagsByProductId(productId);
  }
}
