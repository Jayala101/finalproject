import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogPostDto } from './create-blog-post.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateBlogPostDto extends PartialType(CreateBlogPostDto) {
  @IsNumber()
  @IsOptional()
  @Min(0)
  viewCount?: number;
}
