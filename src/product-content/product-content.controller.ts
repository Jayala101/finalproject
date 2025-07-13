import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductContentService } from './product-content.service';

@Controller('product-content')
export class ProductContentController {
  constructor(private readonly productContentService: ProductContentService) {}

  // Endpoints will be implemented later
}
