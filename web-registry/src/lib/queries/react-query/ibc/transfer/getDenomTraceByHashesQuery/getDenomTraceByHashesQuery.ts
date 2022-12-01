import { queryDenomTraceByHashes } from 'lib/ibc/transfer/api';

import {
  ReactQueryAddDataToBatchResponse,
  ReactQueryDenomTraceByHashesProps,
} from './getDenomTraceByHashesQuery.types';

export const getDenomTraceByHashesQuery = ({
  hashes,
  ...params
}: ReactQueryDenomTraceByHashesProps): ReactQueryAddDataToBatchResponse => ({
  queryKey: ['DenomTraceByHashes', hashes.join('-')],
  queryFn: async () => {
    return queryDenomTraceByHashes({ hashes });
  },
  keepPreviousData: true,
  ...params,
});
