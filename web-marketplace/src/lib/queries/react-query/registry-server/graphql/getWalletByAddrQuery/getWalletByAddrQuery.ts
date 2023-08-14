import { WalletByAddrDocument, WalletByAddrQuery } from 'generated/graphql';

import {
  ReactQueryGetWalletByAddrQueryParams,
  ReactQueryGetWalletByAddrQueryResponse,
} from './getWalletByAddrQuery.types';
import { getWalletByAddrQueryKey } from './getWalletByAddrQuery.utils';

export const getWalletByAddrQuery = ({
  client,
  ...params
}: ReactQueryGetWalletByAddrQueryParams): ReactQueryGetWalletByAddrQueryResponse => ({
  queryKey: getWalletByAddrQueryKey(params.addr),
  queryFn: async () => {
    const { data } = await client.query<WalletByAddrQuery>({
      query: WalletByAddrDocument,
      variables: { ...params },
    });

    return data;
  },
  ...params,
});
