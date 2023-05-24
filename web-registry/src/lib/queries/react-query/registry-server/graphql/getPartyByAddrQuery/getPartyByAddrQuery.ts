import { PartyByAddrDocument, PartyByAddrQuery } from 'generated/graphql';

import {
  ReactQueryGetPartyByAddrQueryResponse,
  ReactQueryGetPartyByIdQueryParams,
} from './getPartyByAddrQuery.types';
import { getPartyByAddrQueryKey } from './getPartyByAddrQuery.utils';

export const getPartyByAddrQuery = ({
  client,
  ...params
}: ReactQueryGetPartyByIdQueryParams): ReactQueryGetPartyByAddrQueryResponse => ({
  queryKey: getPartyByAddrQueryKey(params),
  queryFn: async () => {
    try {
      const { data } = await client.query<PartyByAddrQuery>({
        query: PartyByAddrDocument,
        variables: { ...params },
      });

      return data;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
