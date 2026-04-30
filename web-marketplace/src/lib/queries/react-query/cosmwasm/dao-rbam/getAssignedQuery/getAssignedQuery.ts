import {
  ReactQueryGetAssignedQueryParams,
  ReactQueryGetAssignedQueryResponse,
} from './getAssignedQuery.types';
import { getAssignedQueryKey } from './getAssignedQuery.utils';

export const getAssignedQuery = ({
  client,
  ...params
}: ReactQueryGetAssignedQueryParams): ReactQueryGetAssignedQueryResponse => ({
  queryKey: getAssignedQueryKey(params),
  queryFn: async () => {
    try {
      const resp = await client.queryContractSmart(params.daoRbamAddress, {
        assigned: { addr: params.addr, role_id: params.roleId },
      });
      return resp;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
