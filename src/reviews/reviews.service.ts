import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create(createReviewDto);
    return this.reviewsRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({
      relations: ['product', 'user'],
    });
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { product_id: productId },
      relations: ['user'],
    });
  }

  async findByUser(userId: string): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { user_id: userId },
      relations: ['product'],
    });
  }

  async findOne(id: string): Promise<Review | null> {
    return this.reviewsRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review | null> {
    await this.reviewsRepository.update(id, updateReviewDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.reviewsRepository.delete(id);
  }

  async getAverageRating(productId: string): Promise<number> {
    const result = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.product_id = :productId', { productId })
      .getRawOne();
    
    return parseFloat(result.average) || 0;
  }
}
