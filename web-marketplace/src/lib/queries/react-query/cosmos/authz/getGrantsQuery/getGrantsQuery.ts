import {
  ReactQueryGrantsProps,
  ReactQueryGrantsResponse,
} from './getGrantsQuery.types';
import { getGrantsQueryKey } from './getGrantsQuery.utils';

export const getGrantsQuery = ({
  client,
  request,
  ...params
}: ReactQueryGrantsProps): ReactQueryGrantsResponse => ({
  queryKey: getGrantsQueryKey(request),
  queryFn: async () => {
    if (!client || !request.granter || !request.grantee) return null;

    return await client.cosmos.authz.v1beta1.grants(request);
  },
  ...params,
});
