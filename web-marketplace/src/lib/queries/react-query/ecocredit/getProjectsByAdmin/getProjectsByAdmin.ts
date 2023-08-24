import { getProjectsByAdminKey } from './getProjectsByAdmin.constants';
import {
  ReactQueryProjectsByAdminProps,
  ReactQueryProjectsByAdminResponse,
} from './getProjectsByAdmin.types';

export const getProjectsByAdminQuery = ({
  client,
  request = {},
  ...params
}: ReactQueryProjectsByAdminProps): ReactQueryProjectsByAdminResponse => ({
  queryKey: getProjectsByAdminKey({ admin: request.admin }),
  queryFn: async () => {
    if (!client) return null;
    return await client.ProjectsByAdmin(request);
  },
  ...params,
});
