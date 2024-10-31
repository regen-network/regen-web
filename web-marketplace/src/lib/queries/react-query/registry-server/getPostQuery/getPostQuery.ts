import { apiUri } from 'lib/apiUri';

import { GET_POST_QUERY_KEY } from './getPostQuery.constants';
import {
  ReactQueryGetPostQueryParams,
  ReactQueryGetPostQueryResponse,
} from './getPostQuery.types';

export const getPostQuery = ({
  iri,
  token,
  languageCode,
  ...params
}: ReactQueryGetPostQueryParams): ReactQueryGetPostQueryResponse => ({
  queryKey: [GET_POST_QUERY_KEY, iri, token ?? '', languageCode],
  queryFn: async () => {
    try {
      const resp = await fetch(
        `${apiUri}/marketplace/v1/posts/${iri}?languageCode=${languageCode}${
          token ? `&token=${token}` : ''
        }`,
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
