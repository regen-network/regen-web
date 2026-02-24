import {
  AccountByAddrWithDaosDocument,
  AccountByAddrWithDaosQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAccountByAddrWithDaosQueryParams,
  ReactQueryGetAccountByAddrWithDaosQueryResponse,
} from './getAccountByAddrWithDaosQuery.types';
import { getAccountByAddrWithDaosQueryKey } from './getAccountByAddrWithDaosQuery.utils';

export const getAccountByAddrWithDaosQuery = ({
  client,
  languageCode,
  ...params
}: ReactQueryGetAccountByAddrWithDaosQueryParams): ReactQueryGetAccountByAddrWithDaosQueryResponse => ({
  queryKey: [...getAccountByAddrWithDaosQueryKey(params), languageCode],
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountByAddrWithDaosQuery>({
        query: AccountByAddrWithDaosDocument,
        variables: { ...params },
      });

      if (data.accountByAddr) {
        const localizedDescription =
          data.accountByAddr.accountTranslationsById.nodes.find(
            node => node?.languageCode === languageCode,
          )?.description ?? data.accountByAddr.description;

        const localizedData = Object.assign({}, data, {
          accountByAddr: {
            ...data.accountByAddr,
            description: localizedDescription,
          },
        });

        return localizedData;
      }
      return null;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
