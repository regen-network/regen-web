import { useState, useEffect } from 'react';

import {
  QueryBasketBalancesResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';

export default function useQueryBasketBalances(
  basketDenom?: string,
): QueryBasketBalancesResponse | undefined {
  const { api } = useLedger();
  const [basketBalances, setBasketBalances] = useState<
    QueryBasketBalancesResponse | undefined
  >();

  useEffect(() => {
    if (!api?.queryClient || !basketDenom) return;

    const queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    queryClient
      .BasketBalances({ basketDenom })
      .then(setBasketBalances)
      /* eslint-disable */
      .catch(console.error);
  }, [api?.queryClient, basketDenom]);

  return basketBalances;
}
