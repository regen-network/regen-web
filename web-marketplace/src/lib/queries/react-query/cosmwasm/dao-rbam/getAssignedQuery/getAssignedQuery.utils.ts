import { GET_ASSIGNED_KEY } from './getAssignedQuery.constants';
import { AssignedQueryParams } from './getAssignedQuery.types';

export const getAssignedQueryKey = ({
  daoRbamAddress,
  addr,
  roleId,
}: AssignedQueryParams) => [GET_ASSIGNED_KEY, addr, daoRbamAddress, roleId];
