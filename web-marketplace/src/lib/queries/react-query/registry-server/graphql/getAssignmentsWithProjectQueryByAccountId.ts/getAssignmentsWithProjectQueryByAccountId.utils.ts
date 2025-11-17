import { AssignmentsWithProjectsByAccountIdQueryVariables } from 'generated/graphql';

import { ASSIGNMENTS_WITH_PROJECTS_BY_ACCOUNT_ID_QUERY_KEY } from './getAssignmentsWithProjectQueryByAccountId.constants';

export const getAssignmentsWithProjectsByAccountIdQueryKey = ({
  id,
}: AssignmentsWithProjectsByAccountIdQueryVariables) => [
  ASSIGNMENTS_WITH_PROJECTS_BY_ACCOUNT_ID_QUERY_KEY,
  id,
];
