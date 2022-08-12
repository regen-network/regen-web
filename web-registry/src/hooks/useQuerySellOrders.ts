import { useCallback, useEffect, useState } from 'react';
import {
  QueryClientImpl,
  QuerySellOrdersResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { useLedger } from '../ledger';

export const useQuerySellOrders = function (): {
  sellOrdersResponse: QuerySellOrdersResponse | undefined;
  refetchSellOrders: () => void;
} {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [sellOrdersResponse, setSellOrdersResponse] = useState<
    QuerySellOrdersResponse | undefined
  >(undefined);
  const [refetchCount, setRefetchCount] = useState(0);

  const refetchSellOrders = useCallback(
    () => setRefetchCount(refetchCount + 1),
    [refetchCount],
  );

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient) return;

    async function fetchData(client: QueryClientImpl): Promise<void> {
      await client.SellOrders({}).then(setSellOrdersResponse);
    }

    fetchData(queryClient);
  }, [queryClient, refetchCount]);

  return { sellOrdersResponse, refetchSellOrders };
};
