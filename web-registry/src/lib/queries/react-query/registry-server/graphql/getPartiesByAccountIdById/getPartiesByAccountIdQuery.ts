import {
  PartiesByAccountIdDocument,
  PartiesByAccountIdQuery,
} from 'generated/graphql';

import {
  ReactQueryGetPartiesByAccountIdQueryResponse,
  ReactQueryGetPartyByIdQueryParams,
} from './getPartiesByAccountIdQuery.types';
import { getPartiesByAccountIdQueryKey } from './getPartiesByAccountIdQuery.utils';

export const getPartiesByAccountIdQuery = ({
  client,
  ...params
}: ReactQueryGetPartyByIdQueryParams): ReactQueryGetPartiesByAccountIdQueryResponse => ({
  queryKey: getPartiesByAccountIdQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<PartiesByAccountIdQuery>({
        query: PartiesByAccountIdDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
