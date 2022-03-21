import { useState, useEffect } from 'react';

import {
  QueryBasketsResponse,
  QueryClientImpl,
} from '@regen-network/api/lib/generated/regen/ecocredit/basket/v1/query';

import { useLedger } from '../ledger';

export default function useQueryBaskets(): QueryBasketsResponse | undefined {
  const { api } = useLedger();
  const [baskets, setBaskets] = useState<QueryBasketsResponse | undefined>();

  useEffect(() => {
    if (!api?.queryClient) return;

    const queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    queryClient
      .Baskets({})
      .then(setBaskets)
      /* eslint-disable */
      .catch(console.error);
  }, [api?.queryClient]);

  return baskets;
}
