import { GetPartiesByNameOrAddrQueryVariables } from 'generated/graphql';

import { PARTIES_BY_NAME_OR_ADDR_QUERY_KEY } from './getPartiesByNameOrAddrQuery.constants';

export const getPartiesByNameOrAddrQueryKey = ({
  input,
}: GetPartiesByNameOrAddrQueryVariables) => [
  PARTIES_BY_NAME_OR_ADDR_QUERY_KEY,
  input,
];
