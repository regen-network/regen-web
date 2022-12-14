import { queryProject } from 'lib/ecocredit/api';

import {
  ReactQueryProjectProps,
  ReactQueryProjectResponse,
} from './getProjectQuery.types';

export const getProjectQuery = ({
  request,
  client,
  ...params
}: ReactQueryProjectProps): ReactQueryProjectResponse => ({
  queryKey: ['project', request.projectId ?? ''],
  queryFn: async () => {
    if (!client) return null;
    try {
      return await queryProject({
        request,
        client,
      });
    } catch (e) {
      return null;
    }
  },
  ...params,
});
