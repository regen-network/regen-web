import { PartyByIdDocument, PartyByIdQuery } from 'generated/graphql';

import { PARTY_BY_ID_QUERY_KEY } from './getPartyByIdQuery.constants';
import {
  ReactQueryGetPartyByIdQueryParams,
  ReactQueryGetPartyByIdQueryResponse,
} from './getPartyByIdQuery.types';

export const getPartyByIdQuery = ({
  client,
  ...params
}: ReactQueryGetPartyByIdQueryParams): ReactQueryGetPartyByIdQueryResponse => ({
  queryKey: [PARTY_BY_ID_QUERY_KEY, params.id],
  queryFn: async () => {
    const { data } = await client.query<PartyByIdQuery>({
      query: PartyByIdDocument,
      variables: { ...params },
    });

    return data;
  },
  ...params,
});
