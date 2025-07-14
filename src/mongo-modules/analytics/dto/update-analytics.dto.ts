import { PartialType } from '@nestjs/mapped-types';
import { CreatePageViewDto } from './create-page-view.dto';
import { CreateProductViewDto } from './create-product-view.dto';
import { CreateConversionEventDto } from './create-conversion-event.dto';
import { CreateMetricsSummaryDto } from './create-metrics-summary.dto';

export class UpdatePageViewDto extends PartialType(CreatePageViewDto) {}

export class UpdateProductViewDto extends PartialType(CreateProductViewDto) {}

export class UpdateConversionEventDto extends PartialType(CreateConversionEventDto) {}

export class UpdateMetricsSummaryDto extends PartialType(CreateMetricsSummaryDto) {}
