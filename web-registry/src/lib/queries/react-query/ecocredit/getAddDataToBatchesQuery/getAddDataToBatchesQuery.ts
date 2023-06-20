import { addDataToBatches } from 'lib/ecocredit/api';

import {
  ReactQueryAddDataToBatchesParams,
  ReactQueryAddDataToBatchesResponse,
} from './getAddDataToBatchesQuery.types';

export const getAddDataToBatchesQuery = ({
  batches,
  sanityCreditClassData,
  reactQueryClient,
  dataClient,
  ecocreditClient,
  ...params
}: ReactQueryAddDataToBatchesParams): ReactQueryAddDataToBatchesResponse => ({
  queryKey: ['addDataToBatches', batches?.map(batch => batch.denom).join(',')],
  queryFn: async () => {
    if (!batches) return null;

    const batchesWithSupply = await addDataToBatches({
      batches,
      sanityCreditClassData,
      reactQueryClient,
      dataClient,
      ecocreditClient,
    });

    return batchesWithSupply;
  },
  ...params,
});
