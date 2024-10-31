import { AccountByAddrDocument, AccountByAddrQuery } from 'generated/graphql';

import {
  ReactQueryGetAccountByAddrQueryParams,
  ReactQueryGetAccountByAddrQueryResponse,
} from './getAccountByAddrQuery.types';
import { getAccountByAddrQueryKey } from './getAccountByAddrQuery.utils';

export const getAccountByAddrQuery = ({
  client,
  languageCode,
  ...params
}: ReactQueryGetAccountByAddrQueryParams): ReactQueryGetAccountByAddrQueryResponse => ({
  queryKey: [...getAccountByAddrQueryKey(params), languageCode],
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountByAddrQuery>({
        query: AccountByAddrDocument,
        variables: { ...params },
      });

      const localizedDescription =
        data?.accountByAddr?.accountTranslationsById.nodes.find(
          node => node?.languageCode === languageCode,
        )?.description ?? data?.accountByAddr?.description;

      const localizedData = Object.assign({}, data, {
        accountByAddr: {
          ...data.accountByAddr,
          description: localizedDescription,
        },
      });

      return localizedData;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
