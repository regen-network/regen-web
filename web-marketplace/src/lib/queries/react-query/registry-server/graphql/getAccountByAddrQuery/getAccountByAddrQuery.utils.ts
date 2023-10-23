import { AccountByAddrQueryVariables } from 'generated/graphql';

import { ACCOUNT_BY_ADDR_QUERY_KEY } from './getAccountByAddrQuery.constants';

export const getAccountByAddrQueryKey = ({
  addr,
}: AccountByAddrQueryVariables) => [ACCOUNT_BY_ADDR_QUERY_KEY, addr];
