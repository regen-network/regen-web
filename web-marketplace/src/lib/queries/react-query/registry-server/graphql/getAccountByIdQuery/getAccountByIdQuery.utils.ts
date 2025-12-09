import { AccountByIdQueryVariables } from 'generated/graphql';

import { ACCOUNT_BY_ID_QUERY_KEY } from './getAccountByIdQuery.constants';

export const getAccountByIdQueryKey = ({ id }: AccountByIdQueryVariables) => [
  ACCOUNT_BY_ID_QUERY_KEY,
  id,
];
