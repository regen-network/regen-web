import { keepPreviousData } from '@tanstack/react-query';

import { queryProjects } from 'lib/ecocredit/api';

import { PROJECTS_QUERY_KEY } from './getProjectsQuery.constants';
import {
  ReactQueryProjectsProps,
  ReactQueryProjectsResponse,
} from './getProjectsQuery.types';

export const getProjectsQuery = ({
  client,
  request,
  ...params
}: ReactQueryProjectsProps): ReactQueryProjectsResponse => ({
  queryKey: [PROJECTS_QUERY_KEY],
  queryFn: async () => {
    if (!client) return;

    return await queryProjects({ client, request });
  },
  placeholderData: keepPreviousData,
  ...params,
});
