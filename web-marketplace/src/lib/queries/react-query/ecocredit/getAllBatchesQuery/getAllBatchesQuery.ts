import { keepPreviousData } from '@tanstack/react-query';

import { queryAllBatches } from 'lib/ecocredit/api';

import {
  ReactQueryBatchesProps,
  ReactQueryBatchesResponse,
} from '../getBatchesQuery/getBatchesQuery.types';

export const getAllBatchesQuery = ({
  client,
  request,
  ...params
}: ReactQueryBatchesProps): ReactQueryBatchesResponse => ({
  queryKey: ['allBatches'],
  queryFn: async () => {
    if (!client) return;
    return await queryAllBatches({ client, request });
  },
  ...params,
});
