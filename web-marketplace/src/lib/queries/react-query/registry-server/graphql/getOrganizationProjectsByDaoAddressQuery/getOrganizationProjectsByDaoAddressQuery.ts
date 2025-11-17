import {
  OrganizationProjectsByDaoAddressDocument,
  OrganizationProjectsByDaoAddressQuery,
} from 'generated/graphql';

import {
  ReactQueryGetOrganizationProjectsByDaoAddressQueryParams,
  ReactQueryGetOrganizationProjectsByDaoAddressQueryResponse,
} from './getOrganizationProjectsByDaoAddressQuery.types';
import { getOrganizationProjectsByDaoAddressQueryKey } from './getOrganizationProjectsByDaoAddressQuery.utils';

export const getOrganizationProjectsByDaoAddressQuery = ({
  client,
  ...params
}: ReactQueryGetOrganizationProjectsByDaoAddressQueryParams): ReactQueryGetOrganizationProjectsByDaoAddressQueryResponse => ({
  queryKey: getOrganizationProjectsByDaoAddressQueryKey(params),
  queryFn: async () => {
    try {
      const { data } =
        await client.query<OrganizationProjectsByDaoAddressQuery>({
          query: OrganizationProjectsByDaoAddressDocument,
          variables: { ...params },
        });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
