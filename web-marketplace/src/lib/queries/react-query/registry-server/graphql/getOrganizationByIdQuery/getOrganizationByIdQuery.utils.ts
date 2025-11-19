import { OrganizationByIdQueryVariables } from 'generated/graphql';

import { ORGANIZATION_BY_ID_QUERY_KEY } from './getOrganizationByIdQuery.constants';

export const getOrganizationByIdQueryKey = ({
  id,
}: OrganizationByIdQueryVariables) => [ORGANIZATION_BY_ID_QUERY_KEY, id];
