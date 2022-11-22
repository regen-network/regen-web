import { queryDenomTraceByHashes } from 'lib/ibc/transfer/api';

import {
  ReactQueryDenomTraceByHashesProps,
  ReactQueryDenomTraceByHashesResponse,
} from './getDenomTraceByHashesQuery.types';

export const getDenomTraceByHashesQuery = ({
  hashes,
  enabled = true,
}: ReactQueryDenomTraceByHashesProps): ReactQueryDenomTraceByHashesResponse => ({
  queryKey: ['DenomTraceByHashes', hashes.join('-')],
  queryFn: async () => {
    return queryDenomTraceByHashes({ hashes });
  },
  enabled,
  staleTime: Infinity,
  keepPreviousData: true,
});
