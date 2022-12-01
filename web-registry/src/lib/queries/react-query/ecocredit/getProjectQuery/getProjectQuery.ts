import { getProject } from 'lib/ecocredit/api';

import {
  ReactQueryProjectProps,
  ReactQueryProjectResponse,
} from './getProjectQuery.types';

export const getProjectQuery = ({
  request,
  ...params
}: ReactQueryProjectProps): ReactQueryProjectResponse => ({
  queryKey: ['project', request.projectId],
  queryFn: async () => {
    return await getProject(request.projectId ?? '');
  },
  ...params,
});
