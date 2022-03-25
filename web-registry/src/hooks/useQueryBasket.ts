import { useState, useEffect } from 'react';

import {
  QueryBasketResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';

export default function useQueryBasket(
  basketDenom?: string,
): QueryBasketResponse | undefined {
  const { api } = useLedger();
  const [basket, setBasket] = useState<QueryBasketResponse | undefined>();

  useEffect(() => {
    if (!api?.queryClient || !basketDenom) return;

    const queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    queryClient
      .Basket({ basketDenom })
      .then(setBasket)
      /* eslint-disable */
      .catch(console.error);
  }, [api?.queryClient, basketDenom]);

  return basket;
}
