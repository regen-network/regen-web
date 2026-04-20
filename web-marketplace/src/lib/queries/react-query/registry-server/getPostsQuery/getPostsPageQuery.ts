import { apiUri } from 'lib/apiUri';

import { GET_POSTS_QUERY_KEY } from './getPostsQuery.constants';
import { PostsPageQueryResponse } from './getPostsQuery.types';

export type PostsSortField = 'name' | 'created_at' | 'author';
export type PostsSortOrder = 'asc' | 'desc';

type GetPostsPageQueryParams = {
  /** Off-chain project id */
  projectId?: string;
  /** 0-based offset for pagination */
  offset: number;
  /** Number of posts per page */
  limit: number;
  languageCode: string;
  /** Column to sort by */
  sort?: PostsSortField;
  /** Sort direction */
  sortOrder?: PostsSortOrder;
  enabled?: boolean;
};

/**
 * Non-infinite query for offset/limit pagination of posts.
 *
 * Supports optional server-side sorting via `sort` and `order` params.
 *
 * Uses the same `GET_POSTS_QUERY_KEY` prefix as `getPostsQuery` so that
 * cache invalidation in PostFlow and useDelete (which match on
 * `[GET_POSTS_QUERY_KEY, projectId, undefined, languageCode]`) still
 * covers this query via React Query's partial-match semantics.
 */
export const getPostsPageQuery = ({
  projectId,
  offset,
  limit,
  languageCode,
  sort,
  sortOrder,
  enabled = true,
}: GetPostsPageQueryParams) => ({
  queryKey: [
    GET_POSTS_QUERY_KEY,
    projectId,
    undefined, // year — undefined keeps cache invalidation compatible
    languageCode,
    offset,
    limit,
    sort,
    sortOrder,
  ],
  queryFn: async (): Promise<PostsPageQueryResponse> => {
    try {
      let url = `${apiUri}/marketplace/v1/posts/project/${projectId}?limit=${limit}&offset=${offset}&languageCode=${languageCode}&year=all`;
      if (sort) url += `&sort=${sort}`;
      if (sortOrder) url += `&sortOrder=${sortOrder}`;
      const resp = await fetch(url, {
        method: 'GET',
        credentials: 'include',
      });
      if (resp.status === 200) {
        return await resp.json();
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  enabled: enabled && !!projectId,
});
