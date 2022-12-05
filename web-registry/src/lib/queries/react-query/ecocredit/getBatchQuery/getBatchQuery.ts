import { queryBatchInfo } from 'lib/ecocredit/api';

import {
  ReactQueryBatchesProps,
  ReactQueryBatchResponse,
} from './getBatchQuery.types';

export const getBatchQuery = ({
  client,
  request,
  ...params
}: ReactQueryBatchesProps): ReactQueryBatchResponse => ({
  queryKey: ['batch', request.batchDenom],
  queryFn: async () => {
    if (!client) return;
    return await queryBatchInfo({ client, request });
  },
  keepPreviousData: true,
  ...params,
});
