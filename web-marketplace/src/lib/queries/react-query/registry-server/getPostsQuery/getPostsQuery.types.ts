import { Post } from '../getPostQuery/getPostQuery.types';

export type PostsQueryResponse = {
  posts: Post[];
  years?: Array<number>;
  next?: string;
} | null;

export type GetPostsQueryParams = {
  projectId?: string;
  next?: string;
  year?: number | null;
  languageCode: string;
};
export type ReactQueryGetPostsQueryParams = GetPostsQueryParams;
