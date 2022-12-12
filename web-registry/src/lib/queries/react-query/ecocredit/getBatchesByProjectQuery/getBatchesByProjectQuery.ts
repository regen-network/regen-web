import { queryBatchesByProject } from 'lib/ecocredit/api';

import { getBatchesByProjectKey } from './getBatchesByProjectQuery.constants';
import {
  ReactQueryBatchesByProjectProps,
  ReactQueryBatchesByProjectResponse,
} from './getBatchesByProjectQuery.types';

export const getBatchesByProjectQuery = ({
  client,
  request,
  ...params
}: ReactQueryBatchesByProjectProps): ReactQueryBatchesByProjectResponse => ({
  queryKey: getBatchesByProjectKey({
    projectId: request.projectId ?? '',
    limit: String(request.pagination?.limit),
    offset: String(request.pagination?.offset),
  }),
  queryFn: async () => {
    if (!client) return;
    return await queryBatchesByProject({ client, request });
  },
  ...params,
});
