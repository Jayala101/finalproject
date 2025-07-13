import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDescription } from './schemas/product-description.schema';
import { ProductTag } from './schemas/product-tag.schema';

@Injectable()
export class ProductContentService {
  constructor(
    @InjectModel(ProductDescription.name) private readonly productDescriptionModel: Model<ProductDescription>,
    @InjectModel(ProductTag.name) private readonly productTagModel: Model<ProductTag>,
  ) {}

  // Service methods will be implemented later
}
