import { DaoByAddressDocument, DaoByAddressQuery } from 'generated/graphql';

import {
  ReactQueryGetDaoByAddressQueryParams,
  ReactQueryGetDaoByAddressQueryResponse,
} from './getDaoByAddressQuery.types';
import { getDaoByAddressQueryKey } from './getDaoByAddressQuery.utils';

export const getDaoByAddressQuery = ({
  client,
  ...params
}: ReactQueryGetDaoByAddressQueryParams): ReactQueryGetDaoByAddressQueryResponse => ({
  queryKey: getDaoByAddressQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<DaoByAddressQuery>({
        query: DaoByAddressDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
