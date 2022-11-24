import { addDataToBatch } from 'lib/ecocredit/api';

import {
  ReactQueryAddDataToBatchParams,
  ReactQueryAddDataToBatchResponse,
} from './getAddDataToBatchesQuery.types';

export const getAddDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
  reactQueryClient,
  ...params
}: ReactQueryAddDataToBatchParams): ReactQueryAddDataToBatchResponse => ({
  queryKey: batches && [
    'addDataToBatches',
    batches.map(batch => batch.denom).join(','),
  ],
  queryFn: async () => {
    if (!batches) return;

    const batchesWithSupply = await addDataToBatch({
      batches,
      sanityCreditClassData,
      reactQueryClient,
    });

    return batchesWithSupply;
  },
  ...params,
});
