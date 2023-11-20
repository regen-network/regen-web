import { AccountProjectsByIdQueryVariables } from 'generated/graphql';

import { ACCOUNT_PROJECTS_BY_ID_QUERY_KEY } from './getAccountProjectsByIdQuery.constants';

export const getAccountProjectsByIdQueryKey = ({
  id,
}: AccountProjectsByIdQueryVariables) => [ACCOUNT_PROJECTS_BY_ID_QUERY_KEY, id];
