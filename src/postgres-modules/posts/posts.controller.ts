import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as BlogPost } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<BlogPost> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.postsService.findAll();
  }

  @Get('published')
  findPublished(): Promise<BlogPost[]> {
    return this.postsService.findPublished();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<BlogPost> {
    return this.postsService.update(id, updatePostDto);
  }

  @Patch(':id/publish')
  @HttpCode(HttpStatus.OK)
  publish(@Param('id') id: string): Promise<BlogPost> {
    return this.postsService.publish(id);
  }

  @Patch(':id/unpublish')
  @HttpCode(HttpStatus.OK)
  unpublish(@Param('id') id: string): Promise<BlogPost> {
    return this.postsService.unpublish(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}
