import { PostResponseSchema, PostsResponseSchema } from "@/schema/post.schema";
import { UserResponseSchema } from "@/schema/user.schema";

export const getUser = (userId: string) =>
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then(UserResponseSchema.parse);

export const getPost = (postId: string) =>
  fetch(`/api/posts/${postId}`)
    .then((res) => res.json())
    .then(PostResponseSchema.parse);

export const getPosts = (userId: string) =>
  fetch(`/api/users/${userId}/posts`)
    .then((res) => res.json())
    .then(PostsResponseSchema.parse);
