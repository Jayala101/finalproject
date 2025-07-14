export class ReviewResponseDto {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  helpfulVotes: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(review: any) {
    this.id = review._id?.toString() || review.id;
    this.productId = review.productId;
    this.userId = review.userId;
    this.rating = review.rating;
    this.title = review.title;
    this.comment = review.comment;
    this.verified = review.verified || false;
    this.helpfulVotes = review.helpfulVotes || 0;
    this.images = review.images || [];
    this.createdAt = review.createdAt;
    this.updatedAt = review.updatedAt;
  }

  static fromArray(reviews: any[]): ReviewResponseDto[] {
    return reviews.map(review => new ReviewResponseDto(review));
  }

  toSummary(): { rating: number; verified: boolean; helpfulVotes: number } {
    return {
      rating: this.rating,
      verified: this.verified,
      helpfulVotes: this.helpfulVotes
    };
  }
}
