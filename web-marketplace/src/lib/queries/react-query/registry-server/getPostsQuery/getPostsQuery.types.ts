import { InfiniteQueryObserverOptions } from '@tanstack/react-query';

import { ReactQueryBuilderResponse } from '../../types/react-query.types';
import { Post } from '../getPostQuery/getPostQuery.types';

export type PostsQueryResponse = {
  posts: Post[];
  years?: Array<number>;
  next?: string;
} | null;
export type ReactQueryGetPostsQueryResponse =
  InfiniteQueryObserverOptions<PostsQueryResponse>;

export type GetPostsQueryParams = {
  projectId?: string;
  next?: string;
  year?: number | null;
  languageCode: string;
};
export type ReactQueryGetPostsQueryParams = GetPostsQueryParams &
  ReactQueryBuilderResponse<ReactQueryGetPostsQueryResponse>;
