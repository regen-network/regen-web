import { addDataToBatch, queryBatches } from 'lib/ecocredit/api';

import {
  ReactQueryAddDataToBatchesResponse,
  ReactQueryAddDataToBatchParams,
  ReactQueryBatchesProps,
  ReactQueryBatchesResponse,
} from './queries.ecocredit.types';

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
    if (client) {
      const batches = await queryBatches({ client, request });

      return batches;
    }

    return undefined;
  },
  enabled,
  staleTime: Infinity,
});

export const getAddDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
}: ReactQueryAddDataToBatchParams): ReactQueryAddDataToBatchesResponse => ({
  queryKey: batches && [
    'addDataTobatches',
    batches.map(batch => batch.denom).join(','),
  ],
  queryFn: async () => {
    if (batches) {
      const batchesWithSupply = await addDataToBatch({
        batches,
        sanityCreditClassData,
      });

      return batchesWithSupply;
    }

    return undefined;
  },
  staleTime: Infinity,
});
