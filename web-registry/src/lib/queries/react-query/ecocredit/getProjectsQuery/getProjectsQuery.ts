import { queryProjects } from 'lib/ecocredit/api';

import {
  ReactQueryProjectsProps,
  ReactQueryProjectsResponse,
} from './getProjectsQuery.types';

export const getProjectsQuery = ({
  client,
  request,
  ...params
}: ReactQueryProjectsProps): ReactQueryProjectsResponse => ({
  queryKey: ['projects'],
  queryFn: async () => {
    if (!client) return;

    return await queryProjects({ client, request });
  },
  keepPreviousData: true,
  ...params,
});
