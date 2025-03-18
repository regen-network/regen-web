import { useCallback, useEffect, useState } from 'react';
import {
  QueryBalancesRequest,
  QueryBalancesResponse,
} from '@regen-network/api/regen/ecocredit/v1/query';

import { useLedger } from '../ledger';

type FetchBalances = (
  request: QueryBalancesRequest,
) => Promise<QueryBalancesResponse | undefined>;

type Params = {
  address?: string;
};

export default function useQueryBalances({ address }: Params): {
  balancesResponse: QueryBalancesResponse | undefined;
  fetchBalances: FetchBalances;
} {
  const { queryClient } = useLedger();
  const [balancesResponse, setBalancesResponse] = useState<
    QueryBalancesResponse | undefined
  >();

  const fetchBalances = useCallback(async () => {
    if (!queryClient || !address) return;

    try {
      const balances = await queryClient.regen.ecocredit.v1.balances({
        address,
      });
      return balances;
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }

    return;
  }, [queryClient, address]);

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
