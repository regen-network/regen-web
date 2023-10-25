import {
  AccountProjectsByAddrDocument,
  AccountProjectsByAddrQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAccountProjectsByAddrQueryParams,
  ReactQueryGetAccountProjectsByAddrQueryResponse,
} from './getAccountProjectsByAddrQuery.types';
import { getAccountProjectsByAddrQueryKey } from './getAccountProjectsByAddrQuery.utils';

export const getAccountProjectsByAddrQuery = ({
  client,
  ...params
}: ReactQueryGetAccountProjectsByAddrQueryParams): ReactQueryGetAccountProjectsByAddrQueryResponse => ({
  queryKey: getAccountProjectsByAddrQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountProjectsByAddrQuery>({
        query: AccountProjectsByAddrDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
