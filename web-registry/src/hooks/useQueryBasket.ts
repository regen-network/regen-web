import { useState, useEffect, useCallback } from 'react';

import {
  DeepPartial,
  QueryBasketRequest,
  QueryBasketResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';

// TODO: Use useBasketQuery instead.

type FetchBasket = (
  request: DeepPartial<QueryBasketRequest>,
) => Promise<QueryBasketResponse | undefined>;

export default function useQueryBasket(basketDenom?: string): {
  basket: QueryBasketResponse | undefined;
  fetchBasket: FetchBasket;
} {
  const { api } = useLedger();
  const [basket, setBasket] = useState<QueryBasketResponse | undefined>();
  const [queryClient, setQueryClient] = useState<QueryClientImpl | undefined>();

  const fetchBasket = useCallback(
    async ({ basketDenom }) => {
      if (!queryClient) return;

      try {
        const basket = await queryClient.Basket({ basketDenom });
        return basket;
      } catch (err) {
        console.error(err); // eslint-disable-line no-console
      }

      return;
    },
    [queryClient],
  );

  useEffect(() => {
    if (!api?.queryClient) return;

    const queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(queryClient);

    if (basketDenom) {
      fetchBasket({ basketDenom })
        .then(setBasket)
        /* eslint-disable */
        .catch(console.error);
    }

  }, [api?.queryClient, basketDenom]);

  return { basket, fetchBasket };
}