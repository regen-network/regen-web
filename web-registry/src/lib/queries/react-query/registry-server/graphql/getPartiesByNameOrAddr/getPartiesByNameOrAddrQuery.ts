import {
  GetPartiesByNameOrAddrDocument,
  GetPartiesByNameOrAddrQuery,
} from 'generated/graphql';

import {
  ReactQueryGetPartiesByNameOrAddrQueryResponse,
  ReactQueryGetPartyByIdQueryParams,
} from './getPartiesByNameOrAddrQuery.types';
import { getPartiesByNameOrAddrQueryKey } from './getPartiesByNameOrAddrQuery.utils';

export const getPartiesByNameOrAddrQuery = ({
  client,
  ...params
}: ReactQueryGetPartyByIdQueryParams): ReactQueryGetPartiesByNameOrAddrQueryResponse => ({
  queryKey: getPartiesByNameOrAddrQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<GetPartiesByNameOrAddrQuery>({
        query: GetPartiesByNameOrAddrDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
