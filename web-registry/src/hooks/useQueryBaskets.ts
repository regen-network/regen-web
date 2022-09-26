import { useEffect, useState } from 'react';
import {
  QueryBasketsResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { nctBasket } from 'lib/ledger';

import { useLedger } from '../ledger';

// TODO: Use useBasketQuery instead.

export default function useQueryBaskets(): QueryBasketsResponse | undefined {
  const { api } = useLedger();
  const [baskets, setBaskets] = useState<QueryBasketsResponse | undefined>();

  useEffect(() => {
    if (!api?.queryClient || !nctBasket) return;

    const queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    queryClient
      .Baskets({})
      .then(setBaskets)
      /* eslint-disable */
      .catch(console.error);
  }, [api?.queryClient]);

  return baskets;
}
