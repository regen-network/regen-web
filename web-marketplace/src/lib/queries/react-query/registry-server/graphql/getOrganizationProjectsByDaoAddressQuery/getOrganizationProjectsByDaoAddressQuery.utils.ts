import { OrganizationProjectsByDaoAddressQueryVariables } from 'generated/graphql';

import { ORGANIZATION_PROJECTS_BY_DAO_ADDRESS_QUERY_KEY } from './getOrganizationProjectsByDaoAddressQuery.constants';

export const getOrganizationProjectsByDaoAddressQueryKey = ({
  daoAddress,
}: OrganizationProjectsByDaoAddressQueryVariables) => [
  ORGANIZATION_PROJECTS_BY_DAO_ADDRESS_QUERY_KEY,
  daoAddress,
];
