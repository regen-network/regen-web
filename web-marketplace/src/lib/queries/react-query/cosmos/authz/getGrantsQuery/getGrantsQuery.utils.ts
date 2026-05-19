import { QueryGrantsRequest } from '@regen-network/api/cosmos/authz/v1beta1/query';

import { AUTHZ_GRANTS_KEY } from './getGrantsQuery.constants';

export const getGrantsQueryKey = (request: QueryGrantsRequest): string[] => [
  AUTHZ_GRANTS_KEY,
  request.granter,
  request.grantee,
  request.msgTypeUrl,
  ...(request.pagination?.key?.length
    ? [Array.from(request.pagination.key).join(',')]
    : []),
  ...(request.pagination?.offset !== undefined
    ? [request.pagination.offset.toString()]
    : []),
  ...(request.pagination?.limit !== undefined
    ? [request.pagination.limit.toString()]
    : []),
];
