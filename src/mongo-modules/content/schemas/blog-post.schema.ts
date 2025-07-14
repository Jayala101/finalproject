import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  excerpt: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  featuredImage: string;

  @Prop()
  author: string;

  @Prop({ default: Date.now })
  publishDate: Date;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: true })
  published: boolean;

  @Prop()
  seoTitle: string;

  @Prop()
  seoDescription: string;

  @Prop({ type: [String] })
  relatedProductIds: string[];

  @Prop({ default: 0 })
  viewCount: number;

  @Prop({ type: [String], default: [] })
  categories: string[];
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
