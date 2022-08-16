import { useCallback, useEffect, useState } from 'react';
import {
  QueryClientImpl,
  QuerySellOrdersResponse,
  SellOrderInfo,
} from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import {
  BatchInfo,
  QueryBatchesByProjectRequest,
  QueryBatchesByProjectResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { querySellOrdersByBatch } from 'lib/ecocredit/api';

import useEcocreditQuery from './useEcocreditQuery';

export const useQuerySellOrdersByProject = function (projectId: string): {
  sellOrders: SellOrderInfo[];
} {
  const [sellOrders, setSellOrders] = useState<SellOrderInfo[]>([]);

  // QueryBatchesByProjectRequest by project_id
  // then query SellOrdersByBatch each batch
  // then return SellOrderInfo[]

  const {
    data: batchesByProject,
    loading,
    error,
  } = useEcocreditQuery<QueryBatchesByProjectResponse>({
    query: 'batchesByProject',
    params: { projectId },
  });

  console.log('batchesByProject', batchesByProject?.batches);
  useEffect(() => {
    const fetchSellOrdersByBatches = async (): Promise<void> => {
      let _sellOrders: SellOrderInfo[] = [];
      if (batchesByProject?.batches?.length) {
        Promise.all(
          batchesByProject.batches.map(async batch => {
            const batchSellOrders = await querySellOrdersByBatch(batch.denom);
            if (batchSellOrders?.sellOrders) {
              _sellOrders.concat(batchSellOrders.sellOrders);
            }
          }),
        );
        setSellOrders(_sellOrders);
      }
    };

    fetchSellOrdersByBatches();
  }, [projectId, batchesByProject]);

  return { sellOrders };
};
