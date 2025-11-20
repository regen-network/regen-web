import {
  AssignmentsWithProjectsByAccountIdDocument,
  AssignmentsWithProjectsByAccountIdQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAssignmentsWithProjectsQueryParams,
  ReactQueryGetAssignmentsWithProjectsQueryResponse,
} from './getAssignmentsWithProjectsQuery.types';
import { getAssignmentsWithProjectsQueryKey } from './getAssignmentsWithProjectsQuery.utils';

export const getAssignmentsWithProjectsQuery = ({
  client,
  ...params
}: ReactQueryGetAssignmentsWithProjectsQueryParams): ReactQueryGetAssignmentsWithProjectsQueryResponse => ({
  queryKey: getAssignmentsWithProjectsQueryKey({ id: params.id }),
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
