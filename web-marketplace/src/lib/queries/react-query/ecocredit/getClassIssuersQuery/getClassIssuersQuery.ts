import { getClassIssuersKey } from './getClassIssuersQuery.constants';
import {
  ReactQueryClassIssuerProps,
  ReactQueryClassIssuersResponse,
} from './getClassIssuersQuery.types';

export const getClassIssuersQuery = ({
  client,
  request,
  ...params
}: ReactQueryClassIssuerProps): ReactQueryClassIssuersResponse => ({
  queryKey: getClassIssuersKey(request?.classId),
  queryFn: async () => {
    if (!client) return null;
    return await client.regen.ecocredit.v1.classIssuers(request);
  },
  ...params,
});
