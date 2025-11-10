import { OrganizationByDaoAddressQueryVariables } from 'generated/graphql';

import { ORGANIZATION_BY_DAO_ADDRESS_QUERY_KEY } from './getOrganizationByDaoAddressQuery.constants';

export const getOrganizationByDaoAddressQueryKey = ({
  daoAddress,
}: OrganizationByDaoAddressQueryVariables) => [
  ORGANIZATION_BY_DAO_ADDRESS_QUERY_KEY,
  daoAddress,
];
