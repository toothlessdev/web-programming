import { PostModel } from 'src/posts/model/post.model';

export class ReadPostDto {
  constructor(private readonly post: PostModel) {}

  public from() {
    return {
      title: this.post.title,
      content: this.post.content,
    };
  }
}
