import { queryDenomTraceByHashes } from 'lib/ibc/transfer/api';

import {
  ReactQueryAddDataToBatchResponse,
  ReactQueryDenomTraceByHashesProps,
} from './getDenomTraceByHashesQuery.types';

export const getDenomTraceByHashesQuery = ({
  hashes,
  queryClient,
  ...params
}: ReactQueryDenomTraceByHashesProps): ReactQueryAddDataToBatchResponse => ({
  // eslint-disable-next-line lingui/no-unlocalized-strings
  queryKey: ['DenomTraceByHashes', hashes.join('-')],
  queryFn: async () => {
    return queryDenomTraceByHashes({ hashes, queryClient });
  },
  keepPreviousData: true,
  ...params,
});
