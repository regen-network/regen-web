import { AccountByAddrWithDaosQueryVariables } from 'generated/graphql';

import { ACCOUNT_BY_ADDR_WITH_DAOS_QUERY_KEY } from './getAccountByAddrWithDaosQuery.constants';

export const getAccountByAddrWithDaosQueryKey = ({
  addr,
}: AccountByAddrWithDaosQueryVariables) => [
  ACCOUNT_BY_ADDR_WITH_DAOS_QUERY_KEY,
  addr,
];
