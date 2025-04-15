import { getClassesByAdminKey } from './getClassesByAdminQuery.constants';
import {
  ReactQueryClassesByAdminProps,
  ReactQueryClassesByAdminResponse,
} from './getClassesByAdminQuery.types';

export const getClassesByAdminQuery = ({
  client,
  request,
  ...params
}: ReactQueryClassesByAdminProps): ReactQueryClassesByAdminResponse => ({
  queryKey: getClassesByAdminKey({ admin: request.admin }),
  queryFn: async () => {
    if (!client) return null;
    return await client.regen.ecocredit.v1.classesByAdmin(request);
  },
  ...params,
});
