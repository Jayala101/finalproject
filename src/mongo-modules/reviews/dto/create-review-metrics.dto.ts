import { IsString, IsNotEmpty, IsNumber, IsOptional, IsObject, Min } from 'class-validator';

export class CreateReviewMetricsDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  totalReviews?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  averageRating?: number;

  @IsObject()
  @IsOptional()
  ratingDistribution?: Record<number, number>;

  @IsNumber()
  @IsOptional()
  @Min(0)
  verifiedReviews?: number;

  // CRUD Methods
  static create(data: Partial<CreateReviewMetricsDto>): CreateReviewMetricsDto {
    const metrics = new CreateReviewMetricsDto();
    Object.assign(metrics, {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      verifiedReviews: 0,
      ...data
    });
    return metrics;
  }

  toObject(): Record<string, any> {
    return {
      productId: this.productId,
      totalReviews: this.totalReviews || 0,
      averageRating: this.averageRating || 0,
      ratingDistribution: this.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      verifiedReviews: this.verifiedReviews || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  calculateAverageRating(): number {
    if (!this.ratingDistribution || this.totalReviews === 0) return 0;
    
    let totalScore = 0;
    let totalReviews = 0;
    
    for (const [rating, count] of Object.entries(this.ratingDistribution)) {
      totalScore += parseInt(rating) * count;
      totalReviews += count;
    }
    
    return totalReviews > 0 ? Math.round((totalScore / totalReviews) * 100) / 100 : 0;
  }

  addReview(rating: number, isVerified: boolean = false): void {
    this.totalReviews = (this.totalReviews || 0) + 1;
    if (isVerified) {
      this.verifiedReviews = (this.verifiedReviews || 0) + 1;
    }
    
    if (!this.ratingDistribution) {
      this.ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }
    
    this.ratingDistribution[rating] = (this.ratingDistribution[rating] || 0) + 1;
    this.averageRating = this.calculateAverageRating();
  }

  validate(): boolean {
    return !!(this.productId);
  }
}
