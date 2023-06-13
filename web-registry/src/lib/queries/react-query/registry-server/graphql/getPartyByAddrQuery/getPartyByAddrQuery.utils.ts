import { PartyByAddrQueryVariables } from 'generated/graphql';

import { PARTY_BY_ADDR_QUERY_KEY } from './getPartyByAddrQuery.constants';

export const getPartyByAddrQueryKey = ({ addr }: PartyByAddrQueryVariables) => [
  PARTY_BY_ADDR_QUERY_KEY,
  addr,
];
