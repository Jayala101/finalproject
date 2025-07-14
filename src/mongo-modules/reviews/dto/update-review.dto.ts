import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsNumber()
  @IsOptional()
  @Min(0)
  helpfulVotes?: number;

  // CRUD Methods
  static create(data: Partial<UpdateReviewDto>): UpdateReviewDto {
    const review = new UpdateReviewDto();
    Object.assign(review, data);
    return review;
  }

  merge(existingData: Record<string, any>): Record<string, any> {
    const updates = this.toUpdateObject();
    return {
      ...existingData,
      ...updates,
      updatedAt: new Date()
    };
  }

  toUpdateObject(): Record<string, any> {
    const updateData: Record<string, any> = {};
    
    if (this.rating !== undefined) updateData.rating = this.rating;
    if (this.title !== undefined) updateData.title = this.title;
    if (this.comment !== undefined) updateData.comment = this.comment;
    if (this.verified !== undefined) updateData.verified = this.verified;
    if (this.images !== undefined) updateData.images = this.images;
    if (this.helpfulVotes !== undefined) updateData.helpfulVotes = this.helpfulVotes;
    
    return updateData;
  }

  hasChanges(): boolean {
    return Object.keys(this.toUpdateObject()).length > 0;
  }

  sanitizeData(): UpdateReviewDto {
    if (this.comment) {
      this.comment = this.comment.trim();
    }
    if (this.title) {
      this.title = this.title.trim();
    }
    return this;
  }
}
