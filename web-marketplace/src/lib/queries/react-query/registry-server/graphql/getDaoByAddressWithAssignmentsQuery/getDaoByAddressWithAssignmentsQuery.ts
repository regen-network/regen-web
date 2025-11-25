import {
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
  ...params
}: ReactQueryGetDaoByAddressWithAssignmentsQueryParams): ReactQueryGetDaoByAddressWithAssignmentsQueryResponse => ({
  queryKey: getDaoByAddressWithAssignmentsQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<DaoByAddressWithAssignmentsQuery>({
        query: DaoByAddressWithAssignmentsDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
