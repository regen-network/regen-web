import { keepPreviousData } from '@tanstack/react-query';

import { queryProjectsByClass } from 'lib/ecocredit/api';

import {
  ReactQueryProjectsByClassProps,
  ReactQueryProjectsResponse,
} from './getProjectsByClassQuery.types';

export const getProjectsByClassQuery = ({
  client,
  request,
  ...params
}: ReactQueryProjectsByClassProps): ReactQueryProjectsResponse => ({
  queryKey: ['projectsByClass', request.classId ?? ''],
  queryFn: async () => {
    if (!client) return;

    return await queryProjectsByClass({ client, request });
  },
  placeholderData: keepPreviousData,
  ...params,
});
