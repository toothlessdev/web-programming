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

  public async readAllPosts() {
    return this.postsRepository.find();
  }

  public async readPostById(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  public async createPost(body: CreatePostDto) {
    const newPost = await this.postsRepository.create(body);
    return this.postsRepository.save(newPost);
  }

  public async updatePost(id: number, body: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException();

    if (body.title) post.title = body.title;
    if (body.author) post.author = body.author;
    if (body.content) post.content = body.content;

    return this.postsRepository.save(post);
  }

  public async deletePost(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException();

    return this.postsRepository.delete(post);
  }
}
