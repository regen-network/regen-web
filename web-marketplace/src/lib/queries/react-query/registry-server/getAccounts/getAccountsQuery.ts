import { apiUri } from 'lib/apiUri';

import { GET_ACCOUNTS_QUERY_KEY } from './getAccountsQuery.constants';
import {
  ReactQueryGetAccountsQueryResponse,
  ReactQueryGetPartyByIdQueryParams,
} from './getAccountsQuery.types';

export const getAccountsQuery = ({
  client,
  ...params
}: ReactQueryGetPartyByIdQueryParams): ReactQueryGetAccountsQueryResponse => ({
  queryKey: [GET_ACCOUNTS_QUERY_KEY],
  queryFn: async () => {
    try {
      const resp = await fetch(`${apiUri}/marketplace/v1/auth/accounts`, {
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
