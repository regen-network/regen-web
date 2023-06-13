import { PartiesByAccountIdQueryVariables } from 'generated/graphql';

import { PARTIES_BY_ACCOUNT_ID_QUERY_KEY } from './getPartiesByAccountIdQuery.constants';

export const getPartiesByAccountIdQueryKey = ({
  id,
}: PartiesByAccountIdQueryVariables) => [PARTIES_BY_ACCOUNT_ID_QUERY_KEY, id];
