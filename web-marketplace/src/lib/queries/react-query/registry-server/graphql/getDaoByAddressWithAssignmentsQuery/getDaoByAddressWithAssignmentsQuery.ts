import {
  AccountsOrderBy,
  DaoByAddressWithAssignmentsDocument,
  DaoByAddressWithAssignmentsQuery,
} from 'generated/graphql';

import {
  ReactQueryGetDaoByAddressWithAssignmentsQueryParams,
  ReactQueryGetDaoByAddressWithAssignmentsQueryResponse,
} from './getDaoByAddressWithAssignmentsQuery.types';
import { getDaoByAddressWithAssignmentsQueryKey } from './getDaoByAddressWithAssignmentsQuery.utils';

export const getDaoByAddressWithAssignmentsQuery = ({
  client,
  daoAccountsOrderBy = AccountsOrderBy.NameAsc,
  ...params
}: ReactQueryGetDaoByAddressWithAssignmentsQueryParams): ReactQueryGetDaoByAddressWithAssignmentsQueryResponse => ({
  queryKey: getDaoByAddressWithAssignmentsQueryKey({
    address: params.address,
    daoAccountsOrderBy,
    includePrivate: params.includePrivate,
  }),
  queryFn: async () => {
    try {
      const { data } = await client.query<DaoByAddressWithAssignmentsQuery>({
        query: DaoByAddressWithAssignmentsDocument,
        variables: { ...params, daoAccountsOrderBy },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
