import { IsString, IsOptional, IsArray, IsNumber, IsDate, ValidateNested, IsObject, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBrowsingHistoryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  source?: string;

  @IsString()
  @IsOptional()
  deviceType?: string;

  // CRUD Methods
  static create(data: Partial<CreateBrowsingHistoryDto>): CreateBrowsingHistoryDto {
    const history = new CreateBrowsingHistoryDto();
    Object.assign(history, {
      duration: 0,
      ...data
    });
    return history;
  }

  toObject(): Record<string, any> {
    return {
      userId: this.userId,
      productId: this.productId,
      category: this.category,
      duration: this.duration || 0,
      source: this.source,
      deviceType: this.deviceType,
      visitedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  updateDuration(seconds: number): void {
    this.duration = seconds;
  }

  validate(): boolean {
    return !!(this.userId && this.productId);
  }
}

export class CreateSearchQueryDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  query: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  resultProductIds?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  clickedProductIds?: string[];

  @IsObject()
  @IsOptional()
  filters?: Record<string, any>;

  @IsNumber()
  @IsOptional()
  resultCount?: number;

  @IsString()
  @IsOptional()
  category?: string;

  // CRUD Methods
  static create(data: Partial<CreateSearchQueryDto>): CreateSearchQueryDto {
    const searchQuery = new CreateSearchQueryDto();
    Object.assign(searchQuery, {
      resultProductIds: [],
      clickedProductIds: [],
      filters: {},
      resultCount: 0,
      ...data
    });
    return searchQuery;
  }

  toObject(): Record<string, any> {
    return {
      userId: this.userId,
      query: this.query,
      resultProductIds: this.resultProductIds || [],
      clickedProductIds: this.clickedProductIds || [],
      filters: this.filters || {},
      resultCount: this.resultCount || 0,
      category: this.category,
      searchedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  addClickedProduct(productId: string): void {
    if (!this.clickedProductIds) this.clickedProductIds = [];
    if (!this.clickedProductIds.includes(productId)) {
      this.clickedProductIds.push(productId);
    }
  }

  getClickThroughRate(): number {
    const totalResults = this.resultProductIds?.length || 0;
    const clickedResults = this.clickedProductIds?.length || 0;
    return totalResults > 0 ? (clickedResults / totalResults) * 100 : 0;
  }

  validate(): boolean {
    return !!(this.userId && this.query);
  }
}

export class CreateClickstreamDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  elementId: string;

  @IsString()
  @IsNotEmpty()
  pageUrl: string;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  timestamp?: Date;

  @IsString()
  @IsOptional()
  sessionId?: string;

  // CRUD Methods
  static create(data: Partial<CreateClickstreamDto>): CreateClickstreamDto {
    const clickstream = new CreateClickstreamDto();
    Object.assign(clickstream, {
      timestamp: new Date(),
      ...data
    });
    return clickstream;
  }

  toObject(): Record<string, any> {
    return {
      userId: this.userId,
      elementId: this.elementId,
      pageUrl: this.pageUrl,
      action: this.action,
      timestamp: this.timestamp || new Date(),
      sessionId: this.sessionId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  isValidClick(): boolean {
    return !!(this.elementId && this.pageUrl && this.action);
  }

  getClickContext(): Record<string, any> {
    return {
      element: this.elementId,
      page: this.pageUrl,
      action: this.action,
      timestamp: this.timestamp
    };
  }

  validate(): boolean {
    return !!(this.userId && this.elementId && this.pageUrl && this.action);
  }
}
