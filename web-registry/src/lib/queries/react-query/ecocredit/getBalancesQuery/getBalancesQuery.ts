import { queryBalances } from 'lib/ecocredit/api';

import {
  ReactQueryBalancesesProps,
  ReactQueryBalancesResponse,
} from './getBalancesQuery.types';

export const getBalancesQuery = ({
  client,
  request,
  ...params
}: ReactQueryBalancesesProps): ReactQueryBalancesResponse => ({
  queryKey: [
    'balances',
    request.address,
    String(request.pagination?.offset ?? 0),
    String(request.pagination?.limit ?? 0),
  ],
  queryFn: async () => {
    if (!client) return;
    return await queryBalances({ client, request });
  },
  keepPreviousData: true,
  ...params,
});
