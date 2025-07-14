import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewMetricsDto } from './create-review-metrics.dto';

export class UpdateReviewMetricsDto extends PartialType(CreateReviewMetricsDto) {}
