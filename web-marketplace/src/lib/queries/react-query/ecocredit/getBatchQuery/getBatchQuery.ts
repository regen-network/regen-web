import { keepPreviousData } from '@tanstack/react-query';

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
    if (!client || !request.batchDenom) return null;
    return await queryBatchInfo({ client, request });
  },
  placeholderData: keepPreviousData,
  ...params,
});
