import {
  Controller,
  Param,
  ParseIntPipe,
  UsePipes,
  Get,
  Post,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async readAllPosts() {
    return this.postsService.readAllPosts();
  }

  @Get(':id')
  public async readPostById(@Param('id') id: string) {
    return this.postsService.readPostById(Number(id));
  }

  @Post()
  public async createPost(@Body() body: CreatePostDto) {
    return this.postsService.createPost(body);
  }

  @Patch(':id')
  public async updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.updatePost(Number(id), body);
  }

  @Delete(':id')
  public async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
