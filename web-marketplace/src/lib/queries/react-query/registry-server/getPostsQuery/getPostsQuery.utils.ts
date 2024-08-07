import { GET_POSTS_QUERY_KEY } from './getPostsQuery.constants';
import { GetPostsQueryParams } from './getPostsQuery.types';

export const getPostsQueryKey = ({ projectId, year }: GetPostsQueryParams) => [
  GET_POSTS_QUERY_KEY,
  projectId,
  year,
];
