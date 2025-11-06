import { keepPreviousData } from '@tanstack/react-query';

import { queryBatches } from 'lib/ecocredit/api';

import {
  ReactQueryBatchesProps,
  ReactQueryBatchesResponse,
} from './getBatchesQuery.types';

export const getBatchesQuery = ({
  client,
  request,
  ...params
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
  placeholderData: keepPreviousData,
  ...params,
});
