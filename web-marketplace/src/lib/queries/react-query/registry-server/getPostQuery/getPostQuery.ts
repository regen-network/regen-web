import { apiUri } from 'lib/apiUri';

import { GET_POST_QUERY_KEY } from './getPostQuery.constants';
import {
  ReactQueryGetPostQueryParams,
  ReactQueryGetPostQueryResponse,
} from './getPostQuery.types';

export const getPostQuery = ({
  iri,
  token,
  ...params
}: ReactQueryGetPostQueryParams): ReactQueryGetPostQueryResponse => ({
  queryKey: [GET_POST_QUERY_KEY, iri, token ?? ''],
  queryFn: async () => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/posts/${iri}${
          token ? `?token=${token}` : ''
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
