import { queryBatchesByClass } from 'lib/ecocredit/api';

import { getBatchesByClassKey } from './getBatchesByClass.constants';
import {
  ReactQueryBatchesByClassProps,
  ReactQueryBatchesByClassResponse,
} from './getBatchesByClass.types';

export const getBatchesByClassQuery = ({
  client,
  request,
  ...params
}: ReactQueryBatchesByClassProps): ReactQueryBatchesByClassResponse => ({
  queryKey: getBatchesByClassKey({
    classId: request.classId ?? '',
    offset: String(request.pagination?.offset),
    limit: String(request.pagination?.limit),
  }),
  queryFn: async () => {
    if (!client) return;
    return await queryBatchesByClass({ client, request });
  },
  ...params,
});
