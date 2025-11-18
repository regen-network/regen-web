import {
  AssignmentsWithProjectsByAccountIdDocument,
  AssignmentsWithProjectsByAccountIdQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAssignmentsWithProjectsByAccountIdQueryParams,
  ReactQueryGetAssignmentsWithProjectsByAccountIdQueryResponse,
} from './getAssignmentsWithProjectQueryByAccountId.types';
import { getAssignmentsWithProjectsByAccountIdQueryKey } from './getAssignmentsWithProjectQueryByAccountId.utils';

export const getAssignmentsWithProjectsByAccountIdQuery = ({
  client,
  ...params
}: ReactQueryGetAssignmentsWithProjectsByAccountIdQueryParams): ReactQueryGetAssignmentsWithProjectsByAccountIdQueryResponse => ({
  queryKey: getAssignmentsWithProjectsByAccountIdQueryKey({ id: params.id }),
  queryFn: async () => {
    try {
      const { data } =
        await client.query<AssignmentsWithProjectsByAccountIdQuery>({
          query: AssignmentsWithProjectsByAccountIdDocument,
          variables: { ...params },
        });

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  },
  ...params,
});
