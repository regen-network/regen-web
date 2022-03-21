import { useState, useEffect, useCallback } from 'react';

import {
  QueryBalanceResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/cosmos/bank/v1beta1/query';

import { useLedger } from '../ledger';

type FetchBalance = {
  address: string | undefined;
  denom: string | undefined;
};

export default function useQueryBalance(): Function {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl | undefined>();

  useEffect(() => {
    if (!api?.queryClient) return;

    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  const fetchBalance = useCallback(
    async ({
      address,
      denom,
    }: FetchBalance): Promise<QueryBalanceResponse | undefined> => {
      if (!queryClient) return;

      try {
        const balance = await queryClient.Balance({ address, denom });
        return balance;
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }

      return;
    },
    [queryClient],
  );

  return fetchBalance;
}
