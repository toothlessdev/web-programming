import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostModel } from './model/post.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
      select: ['id', 'title', 'author', 'createdAt', 'image'],
    });

    return { posts, page, perPage };
  }

  public async readPostById(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  public async createPost(body: CreatePostDto, image: string) {
    const newPost = await this.postsRepository.create({
      ...body,
      image,
    });
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

    return this.postsRepository.delete(id);
  }
}
