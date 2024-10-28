import {
  AccountByCustodialAddressDocument,
  AccountByCustodialAddressQuery,
} from 'generated/graphql';

import {
  ReactQueryGetAccountByCustodialAddressQueryParams,
  ReactQueryGetAccountByCustodialAddressQueryResponse,
} from './getAccountByCustodialAddressQuery.types';
import { getAccountByCustodialAddressQueryKey } from './getAccountByCustodialAddressQuery.utils';

export const getAccountByCustodialAddressQuery = ({
  client,
  ...params
}: ReactQueryGetAccountByCustodialAddressQueryParams): ReactQueryGetAccountByCustodialAddressQueryResponse => ({
  queryKey: getAccountByCustodialAddressQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<AccountByCustodialAddressQuery>({
        query: AccountByCustodialAddressDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
