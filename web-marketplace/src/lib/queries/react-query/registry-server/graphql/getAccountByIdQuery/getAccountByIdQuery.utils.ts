import { AccountByIdQueryVariables, AccountsOrderBy } from 'generated/graphql';

import { ACCOUNT_BY_ID_QUERY_KEY } from './getAccountByIdQuery.constants';

export const getAccountByIdQueryKey = ({
  id,
  daoAccountsOrderBy = AccountsOrderBy.NameAsc,
}: AccountByIdQueryVariables) => [
  ACCOUNT_BY_ID_QUERY_KEY,
  id,
  daoAccountsOrderBy,
];
