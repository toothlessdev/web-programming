import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostModel } from './model/post.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ReadPostDto } from './dto/response/read-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostModel)
    private readonly postsRepository: Repository<PostModel>,
  ) {}

  public async readPosts(page: number, perPage: number) {
    const posts = await this.postsRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
    });
    return { posts, page, perPage };
  }

  public async readPostById(id: number) {
    // return this.postsRepository.findOne({ where: { id } });
    return new ReadPostDto(
      await this.postsRepository.findOne({ where: { id } }),
    ).from();
  }

  public async createPost(body: CreatePostDto) {
    const newPost = await this.postsRepository.create(body);
    return this.postsRepository.save(newPost);
  }

  public async updatePost(id: number, body: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException();

    for (const key of Object.keys(body)) post[key] = body[key];

    return this.postsRepository.save(post);
  }

  public async deletePost(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException();

    return this.postsRepository.delete(post);
  }
}
