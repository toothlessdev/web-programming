export interface Post {
    id: number;
    title: string;
    author: string;
    content: string;
    createdAt: string;
}

export interface IReadPostsResponseBody {
    posts: Omit<Post, "content">[];
    page: number;
    perPage: number;
}

export interface IReadPostByIdResponseBody extends Post {}

export interface ICreatePostRequestBody {
    title: string;
    author: string;
    content: string;
}
