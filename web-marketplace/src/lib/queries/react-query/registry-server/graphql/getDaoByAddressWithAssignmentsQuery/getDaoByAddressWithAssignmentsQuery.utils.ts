import { DaoByAddressWithAssignmentsQueryVariables } from 'generated/graphql';

import { DAO_BY_ADDRESS_WITH_ASSIGNMENTS_QUERY_KEY } from './getDaoByAddressWithAssignmentsQuery.constants';

export const getDaoByAddressWithAssignmentsQueryKey = ({
  address,
  daoAccountsOrderBy,
  includePrivate,
}: DaoByAddressWithAssignmentsQueryVariables) => {
  const queryKey = [
    DAO_BY_ADDRESS_WITH_ASSIGNMENTS_QUERY_KEY,
    address,
    ...(daoAccountsOrderBy ? [daoAccountsOrderBy] : []),
  ];

  // check includePrivate is not null or undefined, as it can be a boolean with false value
  if (includePrivate != null) {
    queryKey.push(String(includePrivate));
  }

  return queryKey;
};
