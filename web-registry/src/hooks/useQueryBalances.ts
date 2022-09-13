import { useCallback, useEffect, useState } from 'react';
import {
  DeepPartial,
  QueryBalancesRequest,
  QueryBalancesResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

type FetchBalances = (
  request: DeepPartial<QueryBalancesRequest>,
) => Promise<QueryBalancesResponse | undefined>;

type Params = {
  address?: string;
};

export default function useQueryBalances({ address }: Params): {
  balancesResponse: QueryBalancesResponse | undefined;
  fetchBalances: FetchBalances;
} {
  const { api } = useLedger();
  const [balancesResponse, setBalancesResponse] = useState<
    QueryBalancesResponse | undefined
  >();
  const [queryClient, setQueryClient] = useState<QueryClientImpl | undefined>();

  const fetchBalances = useCallback(async () => {
    if (!queryClient) return;

    try {
      const balances = await queryClient.Balances({ address });
      return balances;
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }

    return;
  }, [queryClient, address]);

  useEffect(() => {
    if (!api?.queryClient) return;
    if (queryClient) return;
    setQueryClient(new QueryClientImpl(api.queryClient));
  }, [api?.queryClient, queryClient]);

  useEffect(() => {
    if (!queryClient) return;

    if (address) {
      fetchBalances()
        .then(setBalancesResponse)
        /* eslint-disable */
        .catch(console.error);
    }
  }, [queryClient, address]);

  return { balancesResponse, fetchBalances };
}
