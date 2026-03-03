import { Post } from '../getPostQuery/getPostQuery.types';

export type PostsQueryResponse = {
  posts: Post[];
  years?: Array<number>;
  next?: string;
} | null;

/**
 * Response shape for the offset/limit paginated posts endpoint.
 */
export type PostsPageQueryResponse = {
  posts: Post[];
  totalCount: number;
} | null;

export type GetPostsQueryParams = {
  projectId?: string;
  next?: string;
  year?: number | null;
  languageCode: string;
};
export type ReactQueryGetPostsQueryParams = GetPostsQueryParams;
