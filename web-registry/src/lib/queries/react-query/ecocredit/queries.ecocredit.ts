import { addDataToBatch, queryBatches } from 'lib/ecocredit/api';

import {
  ReactQueryAddDataToBatchesResponse,
  ReactQueryAddDataToBatchParams,
  ReactQueryBatchesProps,
  ReactQueryBatchesResponse,
} from './queries.ecocredit.types';

/* getBatchesQuery */

export const getBatchesQuery = ({
  client,
  request,
  enabled,
}: ReactQueryBatchesProps): ReactQueryBatchesResponse => ({
  queryKey: [
    'batches',
    String(request.pagination?.offset ?? 0),
    String(request.pagination?.limit ?? 0),
  ],
  queryFn: async () => {
    if (!client) return;
    return await queryBatches({ client, request });
  },
  enabled,
  staleTime: Infinity,
  keepPreviousData: true,
});

/* getBatchesQuery */

export const getAddDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
  enabled = true,
}: ReactQueryAddDataToBatchParams): ReactQueryAddDataToBatchesResponse => ({
  queryKey: batches && [
    'addDataToBatches',
    batches.map(batch => batch.denom).join(','),
  ],
  queryFn: async () => {
    if (!batches) return;

    const batchesWithSupply = await addDataToBatch({
      batches,
      sanityCreditClassData,
    });

    return batchesWithSupply;
  },
  staleTime: Infinity,
  enabled,
});
