import { api } from "./api";
import { ICreatePostRequestBody, IReadPostByIdResponseBody, IReadPostsResponseBody } from "./post.types";

export const postService = {
    readPosts: async (page: string, per_page: string) => {
        return api.Get<IReadPostsResponseBody>(`/posts?page=${page}&per_page=${per_page}`);
    },
    readPostById: async (id: number) => {
        return api.Get<IReadPostByIdResponseBody>(`/posts/${id}`);
    },
    createPost: async (body: ICreatePostRequestBody) => {
        return api.Post(`/posts`, body);
    },
    deletePost: async (id: number) => {
        return api.Delete(`/posts/${id}`);
    },
    patchPost: async (id: number, body: ICreatePostRequestBody) => {
        return api.Patch(`/posts/${id}`, body);
    },
};
