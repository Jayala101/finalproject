import { IsString, IsNotEmpty, IsOptional, IsArray, IsObject, IsBoolean } from 'class-validator';

export class CreateProductContentDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  contentType: string; // 'description', 'specifications', 'features', etc.

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  version?: string;

  // CRUD Methods
  static create(data: Partial<CreateProductContentDto>): CreateProductContentDto {
    const content = new CreateProductContentDto();
    Object.assign(content, {
      isActive: true,
      version: '1.0',
      tags: [],
      metadata: {},
      ...data
    });
    return content;
  }

  toObject(): Record<string, any> {
    return {
      productId: this.productId,
      contentType: this.contentType,
      language: this.language,
      title: this.title,
      content: this.content,
      tags: this.tags || [],
      metadata: this.metadata || {},
      isActive: this.isActive ?? true,
      version: this.version || '1.0',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  clone(): CreateProductContentDto {
    return CreateProductContentDto.create({
      productId: this.productId,
      contentType: this.contentType,
      language: this.language,
      title: this.title,
      content: this.content,
      tags: [...(this.tags || [])],
      metadata: { ...(this.metadata || {}) },
      isActive: this.isActive,
      version: this.incrementVersion()
    });
  }

  incrementVersion(): string {
    if (!this.version) return '1.1';
    const parts = this.version.split('.');
    const minor = parseInt(parts[1] || '0') + 1;
    return `${parts[0]}.${minor}`;
  }

  validate(): boolean {
    return !!(this.productId && this.contentType && this.language && this.title && this.content);
  }

  sanitizeContent(): this {
    this.title = this.title?.trim();
    this.content = this.content?.trim();
    this.tags = this.tags?.filter(tag => tag.trim().length > 0);
    return this;
  }
}