import { apiUri } from 'lib/apiUri';

import {
  ReactQueryGetPostsQueryParams,
  ReactQueryGetPostsQueryResponse,
} from './getPostsQuery.types';
import { getPostsQueryKey } from './getPostsQuery.utils';

export const getPostsQuery = ({
  projectId,
  limit,
  offset,
  year,
  ...params
}: ReactQueryGetPostsQueryParams): ReactQueryGetPostsQueryResponse => ({
  queryKey: getPostsQueryKey({ projectId, limit, offset, year }),
  queryFn: async () => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/posts/project/${projectId}?limit=${limit}&offset=${offset}${
          year ? `&year=${year}` : ''
        }`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      if (resp.status === 200 || resp.status === 401) {
        return await resp.json();
      }
    } catch (e) {
      return null;
    }
  },
  ...params,
});
