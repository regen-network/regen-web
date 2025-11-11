import {
  OrganizationByDaoAddressDocument,
  OrganizationByDaoAddressQuery,
} from 'generated/graphql';

import {
  ReactQueryGetOrganizationByDaoAddressQueryParams,
  ReactQueryGetOrganizationByDaoAddressQueryResponse,
} from './getOrganizationByDaoAddressQuery.types';
import { getOrganizationByDaoAddressQueryKey } from './getOrganizationByDaoAddressQuery.utils';

export const getOrganizationByDaoAddressQuery = ({
  client,
  ...params
}: ReactQueryGetOrganizationByDaoAddressQueryParams): ReactQueryGetOrganizationByDaoAddressQueryResponse => ({
  queryKey: getOrganizationByDaoAddressQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<OrganizationByDaoAddressQuery>({
        query: OrganizationByDaoAddressDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
