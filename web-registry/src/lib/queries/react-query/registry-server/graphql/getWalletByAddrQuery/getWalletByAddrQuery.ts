import { WalletByAddrDocument, WalletByAddrQuery } from 'generated/graphql';

import {
  ReactQueryGetWalletByAddrQueryParams,
  ReactQueryGetWalletByAddrQueryResponse,
} from './getWalletByAddrQuery.types';

export const getWalletByAddrQuery = ({
  client,
  ...params
}: ReactQueryGetWalletByAddrQueryParams): ReactQueryGetWalletByAddrQueryResponse => ({
  queryKey: ['walletByAddrQuery', params.addr],
  queryFn: async () => {
    const { data } = await client.query<WalletByAddrQuery>({
      query: WalletByAddrDocument,
      variables: { ...params },
    });

    return data;
  },
  ...params,
});
