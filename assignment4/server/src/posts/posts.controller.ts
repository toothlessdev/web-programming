import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Query,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async readPosts(
    @Query('page') page: string,
    @Query('per_page') perPage: string,
  ) {
    if (!page || !perPage)
      throw new BadRequestException(
        'page Param 과 perPage Param 은 필수입니다',
      );

    return this.postsService.readPosts(parseInt(page), parseInt(perPage));
  }

  @Get(':id')
  public async readPostById(@Param('id') id: string) {
    return this.postsService.readPostById(Number(id));
  }

  @Post()
  @UseInterceptors(FileInterceptor('image')) // image 키값에 파일 업로드
  public async createPost(
    @Body() body: CreatePostDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(file);
    return this.postsService.createPost(body, file?.filename);
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
