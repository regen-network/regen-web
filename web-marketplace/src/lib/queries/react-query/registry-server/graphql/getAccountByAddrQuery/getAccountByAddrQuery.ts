import { AccountByAddrDocument, AccountByAddrQuery } from 'generated/graphql';

import {
  ReactQueryGetAccountByAddrQueryParams,
  ReactQueryGetAccountByAddrQueryResponse,
} from './getAccountByAddrQuery.types';
import { getAccountByAddrQueryKey } from './getAccountByAddrQuery.utils';

export const getAccountByAddrQuery = ({
  client,
  ...params
}: ReactQueryGetAccountByAddrQueryParams): ReactQueryGetAccountByAddrQueryResponse => ({
  queryKey: getAccountByAddrQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountByAddrQuery>({
        query: AccountByAddrDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
