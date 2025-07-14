import { PartialType } from '@nestjs/mapped-types';
import { CreateBrowsingHistoryDto, CreateSearchQueryDto, CreateClickstreamDto } from './user-behavior.dto';

export class UpdateBrowsingHistoryDto extends PartialType(CreateBrowsingHistoryDto) {}

export class UpdateSearchQueryDto extends PartialType(CreateSearchQueryDto) {}

export class UpdateClickstreamDto extends PartialType(CreateClickstreamDto) {}
