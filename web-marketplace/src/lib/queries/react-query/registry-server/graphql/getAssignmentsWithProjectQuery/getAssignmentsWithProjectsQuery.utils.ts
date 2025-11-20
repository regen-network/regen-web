import { AssignmentsWithProjectsByAccountIdQueryVariables } from 'generated/graphql';

import { ASSIGNMENTS_WITH_PROJECTS_BY_ACCOUNT_ID_QUERY_KEY } from './getAssignmentsWithProjectsQuery.constants';

export const getAssignmentsWithProjectsQueryKey = ({
  id,
}: AssignmentsWithProjectsByAccountIdQueryVariables) => [
  ASSIGNMENTS_WITH_PROJECTS_BY_ACCOUNT_ID_QUERY_KEY,
  id,
];
