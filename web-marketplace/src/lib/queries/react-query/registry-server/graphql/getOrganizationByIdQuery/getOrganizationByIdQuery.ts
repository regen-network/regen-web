import {
  OrganizationByIdDocument,
  OrganizationByIdQuery,
} from 'generated/graphql';

import {
  ReactQueryGetOrganizationByIdQueryParams,
  ReactQueryGetOrganizationByIdQueryResponse,
} from './getOrganizationByIdQuery.types';
import { getOrganizationByIdQueryKey } from './getOrganizationByIdQuery.utils';

export const getOrganizationByIdQuery = ({
  client,
  ...params
}: ReactQueryGetOrganizationByIdQueryParams): ReactQueryGetOrganizationByIdQueryResponse => ({
  queryKey: getOrganizationByIdQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<OrganizationByIdQuery>({
        query: OrganizationByIdDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return null;
    }
  },
  ...params,
});
