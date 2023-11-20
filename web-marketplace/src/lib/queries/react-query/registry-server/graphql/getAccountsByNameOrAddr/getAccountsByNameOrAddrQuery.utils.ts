import { GetAccountsByNameOrAddrQueryVariables } from 'generated/graphql';

import { ACCOUNTS_BY_NAME_OR_ADDR_QUERY_KEY } from './getAccountsByNameOrAddrQuery.constants';

export const getAccountsByNameOrAddrQueryKey = ({
  input,
}: GetAccountsByNameOrAddrQueryVariables) => [
  ACCOUNTS_BY_NAME_OR_ADDR_QUERY_KEY,
  input,
];
