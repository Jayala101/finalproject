import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDescription, ProductDescriptionDocument } from './schemas/product-description.schema';
import { ProductTag, ProductTagDocument } from './schemas/product-tag.schema';

@Injectable()
export class ProductContentService {
  constructor(
    @InjectModel(ProductDescription.name) private productDescriptionModel: Model<ProductDescriptionDocument>,
    @InjectModel(ProductTag.name) private productTagModel: Model<ProductTagDocument>,
  ) {}

  async createProductDescription(createProductDescriptionDto: any): Promise<ProductDescription> {
    const newProductDescription = new this.productDescriptionModel(createProductDescriptionDto);
    return newProductDescription.save();
  }

  async findAllProductDescriptions(): Promise<ProductDescription[]> {
    return this.productDescriptionModel.find().exec();
  }

  async findProductDescriptionById(id: string): Promise<ProductDescription | null> {
    return this.productDescriptionModel.findById(id).exec();
  }

  async findProductDescriptionsByProductId(productId: string): Promise<ProductDescription[]> {
    return this.productDescriptionModel.find({ productId }).exec();
  }
  
  // Add a convenience method to find all content related to a product
  async findByProductId(productId: string): Promise<any> {
    const descriptions = await this.findProductDescriptionsByProductId(productId);
    const tags = await this.findProductTagsByProductId(productId);
    
    return {
      descriptions,
      tags
    };
  }
  
  // Add methods for updating content
  async updateProductDescription(productId: string, updateData: any): Promise<ProductDescription | null> {
    return this.productDescriptionModel.findOneAndUpdate(
      { productId },
      updateData,
      { new: true }
    ).exec();
  }
  
  async updateProductTags(productId: string, updateData: any): Promise<ProductTag | null> {
    return this.productTagModel.findOneAndUpdate(
      { productId },
      updateData,
      { new: true }
    ).exec();
  }
  
  // Add method for removing content
  async removeProductContent(productId: string): Promise<void> {
    await this.productDescriptionModel.deleteMany({ productId }).exec();
    await this.productTagModel.deleteMany({ productId }).exec();
  }

  async createProductTag(createProductTagDto: any): Promise<ProductTag> {
    const newProductTag = new this.productTagModel(createProductTagDto);
    return newProductTag.save();
  }

  async findAllProductTags(): Promise<ProductTag[]> {
    return this.productTagModel.find().exec();
  }

  async findProductTagsByProductId(productId: string): Promise<ProductTag[]> {
    return this.productTagModel.find({ productId }).exec();
  }
}
