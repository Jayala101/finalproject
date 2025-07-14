import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsArray, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsArray()
  @IsOptional()
  images?: string[];

  // CRUD Methods
  static create(data: Partial<CreateReviewDto>): CreateReviewDto {
    const review = new CreateReviewDto();
    Object.assign(review, data);
    return review;
  }

  toObject(): Record<string, any> {
    return {
      productId: this.productId,
      userId: this.userId,
      rating: this.rating,
      title: this.title,
      comment: this.comment,
      verified: this.verified || false,
      images: this.images || [],
      helpfulVotes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  validate(): boolean {
    return !!(this.productId && this.userId && this.rating && this.comment);
  }

  sanitize(): this {
    if (this.comment) {
      this.comment = this.comment.trim();
    }
    if (this.title) {
      this.title = this.title.trim();
    }
    return this;
  }
}
