import { AccountProjectsByAddrQueryVariables } from 'generated/graphql';

import { ACCOUNT_PROJECTS_BY_ADDR_QUERY_KEY } from './getAccountProjectsByAddrQuery.constants';

export const getAccountProjectsByAddrQueryKey = ({
  addr,
}: AccountProjectsByAddrQueryVariables) => [
  ACCOUNT_PROJECTS_BY_ADDR_QUERY_KEY,
  addr,
];
