/* import { useState, useEffect } from 'react';

import {
  QueryClientImpl,
  QuerySellOrdersResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { useLedger } from '../ledger';

export default function useQuerySellOrders():
  | QuerySellOrdersResponse
  | undefined {
  const { api } = useLedger();
  const [queryClient, setQueryClient] = useState<QueryClientImpl>();
  const [sellOrders, setSellOrders] = useState<
    QuerySellOrdersResponse | undefined
  >(undefined);

  useEffect(() => {
    if (!api?.queryClient) return;
    const _queryClient: QueryClientImpl = new QueryClientImpl(api.queryClient);
    setQueryClient(_queryClient);
  }, [api?.queryClient]);

  useEffect(() => {
    if (!queryClient) return;

    async function fetchData(client: QueryClientImpl): Promise<void> {
      await client.SellOrders({}).then(setSellOrders);
    }

    fetchData(queryClient);
  }, [queryClient]);

  return sellOrders;
}
 */

export {};
