import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean, IsDate, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  excerpt?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  featuredImage?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  publishDate?: Date;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  seoTitle?: string;

  @IsString()
  @IsOptional()
  seoDescription?: string;

  @IsArray()
  @IsOptional()
  relatedProductIds?: string[];

  @IsArray()
  @IsOptional()
  categories?: string[];

  // CRUD Methods
  static create(data: Partial<CreateBlogPostDto>): CreateBlogPostDto {
    const blogPost = new CreateBlogPostDto();
    Object.assign(blogPost, {
      featured: false,
      published: true,
      publishDate: new Date(),
      tags: [],
      categories: [],
      relatedProductIds: [],
      ...data
    });
    return blogPost;
  }

  toObject(): Record<string, any> {
    return {
      title: this.title,
      slug: this.slug || this.generateSlug(),
      content: this.content,
      excerpt: this.excerpt || this.generateExcerpt(),
      tags: this.tags || [],
      featuredImage: this.featuredImage,
      author: this.author,
      publishDate: this.publishDate || new Date(),
      featured: this.featured || false,
      published: this.published ?? true,
      seoTitle: this.seoTitle || this.title,
      seoDescription: this.seoDescription || this.excerpt,
      relatedProductIds: this.relatedProductIds || [],
      viewCount: 0,
      categories: this.categories || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  generateSlug(): string {
    return this.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || '';
  }

  generateExcerpt(maxLength: number = 160): string {
    if (!this.content) return '';
    const text = this.content.replace(/<[^>]*>/g, '');
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  addTag(tag: string): void {
    if (!this.tags) this.tags = [];
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    if (this.tags) {
      this.tags = this.tags.filter(t => t !== tag);
    }
  }

  publish(): void {
    this.published = true;
    this.publishDate = new Date();
  }

  unpublish(): void {
    this.published = false;
  }

  validate(): boolean {
    return !!(this.title && this.slug && this.content);
  }
}
