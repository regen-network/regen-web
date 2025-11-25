import { DaoByAddressWithAssignmentsQueryVariables } from 'generated/graphql';

import { DAO_BY_ADDRESS_WITH_ASSIGNMENTS_QUERY_KEY } from './getDaoByAddressWithAssignmentsQuery.constants';

export const getDaoByAddressWithAssignmentsQueryKey = ({
  address,
  daoAccountsOrderBy,
}: DaoByAddressWithAssignmentsQueryVariables) => [
  DAO_BY_ADDRESS_WITH_ASSIGNMENTS_QUERY_KEY,
  address,
  daoAccountsOrderBy,
];
