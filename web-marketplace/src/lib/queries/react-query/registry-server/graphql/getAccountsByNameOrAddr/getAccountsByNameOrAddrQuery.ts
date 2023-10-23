import {
  GetAccountsByNameOrAddrDocument,
  GetAccountsByNameOrAddrQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAccountsByNameOrAddrQueryParams,
  ReactQueryGetAccountsByNameOrAddrQueryResponse,
} from './getAccountsByNameOrAddrQuery.types';
import { getAccountsByNameOrAddrQueryKey } from './getAccountsByNameOrAddrQuery.utils';

export const getAccountsByNameOrAddrQuery = ({
  client,
  ...params
}: ReactQueryGetAccountsByNameOrAddrQueryParams): ReactQueryGetAccountsByNameOrAddrQueryResponse => ({
  queryKey: getAccountsByNameOrAddrQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<GetAccountsByNameOrAddrQuery>({
        query: GetAccountsByNameOrAddrDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
