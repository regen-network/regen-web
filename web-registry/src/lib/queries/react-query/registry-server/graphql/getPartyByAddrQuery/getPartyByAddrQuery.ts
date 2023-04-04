import { PartyByAddrDocument, PartyByAddrQuery } from 'generated/graphql';

import { PARTY_BY_ADDR_QUERY_KEY } from './getPartyByAddrQuery.constants';
import {
  ReactQueryGetPartyByAddrQueryResponse,
  ReactQueryGetPartyByIdQueryParams,
} from './getPartyByAddrQuery.types';

export const getPartyByAddrQuery = ({
  client,
  ...params
}: ReactQueryGetPartyByIdQueryParams): ReactQueryGetPartyByAddrQueryResponse => ({
  queryKey: [PARTY_BY_ADDR_QUERY_KEY, params.addr],
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
