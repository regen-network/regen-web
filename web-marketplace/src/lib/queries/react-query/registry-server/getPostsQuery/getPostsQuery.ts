import { apiUri } from 'lib/apiUri';

import { DATA_STREAM_LIMIT } from './getPostsQuery.constants';
import {
  ReactQueryGetPostsQueryParams,
  ReactQueryGetPostsQueryResponse,
} from './getPostsQuery.types';
import { getPostsQueryKey } from './getPostsQuery.utils';

export const getPostsQuery = ({
  projectId,
  year,
  languageCode,
  ...params
}: ReactQueryGetPostsQueryParams): ReactQueryGetPostsQueryResponse => ({
  queryKey: getPostsQueryKey({ projectId, year, languageCode }),
  queryFn: async ({ pageParam }) => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/posts/project/${projectId}?limit=${DATA_STREAM_LIMIT}&languageCode=${languageCode}${
          pageParam ? `&next=${pageParam}` : ''
        }${year ? `&year=${year}` : ''}`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      if (resp.status === 200 || resp.status === 401) {
        return await resp.json();
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  },
  ...params,
});
