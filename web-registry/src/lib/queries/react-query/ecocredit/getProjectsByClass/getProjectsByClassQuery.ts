import { queryProjectsByClass } from 'lib/ecocredit/api';

import {
  ReactQueryProjectsByClassProps,
  ReactQueryProjectsByClassResponse,
} from './getProjectsByClassQuery.types';

export const getProjectsByClassQuery = ({
  client,
  request,
  enabled,
}: ReactQueryProjectsByClassProps): ReactQueryProjectsByClassResponse => ({
  queryKey: ['projectsByClass', request.classId ?? ''],
  queryFn: async () => {
    if (!client) return;

    return await queryProjectsByClass({ client, request });
  },
  enabled,
  staleTime: Infinity,
  keepPreviousData: true,
});
