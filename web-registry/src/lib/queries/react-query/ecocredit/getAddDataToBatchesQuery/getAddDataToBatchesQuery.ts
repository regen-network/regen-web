import { addDataToBatches } from 'lib/ecocredit/api';

import {
  ReactQueryAddDataToBatchesParams,
  ReactQueryAddDataToBatchesResponse,
} from './getAddDataToBatchesQuery.types';

export const getAddDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
  reactQueryClient,
  ...params
}: ReactQueryAddDataToBatchesParams): ReactQueryAddDataToBatchesResponse => ({
  queryKey: batches && [
    'addDataToBatches',
    batches.map(batch => batch.denom).join(','),
  ],
  queryFn: async () => {
    if (!batches) return;

    const batchesWithSupply = await addDataToBatches({
      batches,
      sanityCreditClassData,
      reactQueryClient,
    });

    return batchesWithSupply;
  },
  ...params,
});
