import { apiUri } from 'lib/apiUri';

import { GET_POST_QUERY_KEY } from './getPostQuery.constants';
import {
  ReactQueryGetPostQueryParams,
  ReactQueryGetPostQueryResponse,
} from './getPostQuery.types';

export const getPostQuery = ({
  iri,
  ...params
}: ReactQueryGetPostQueryParams): ReactQueryGetPostQueryResponse => ({
  queryKey: [GET_POST_QUERY_KEY, iri],
  queryFn: async () => {
    try {
      const resp = await fetch(`${apiUri}/marketplace/v1/posts/${iri}`, {
        method: 'GET',
        credentials: 'include',
      });
      return await resp.json();
    } catch (e) {
      return null;
    }
  },
  ...params,
});
