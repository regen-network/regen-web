import { BANK_ALL_BALANCES_KEY } from './getAllBalancesQuery.constants';
import {
  ReactQueryAllBalancesProps,
  ReactQueryAllBalancesResponse,
} from './getAllBalancesQuery.types';

export const getAllBalancesQuery = ({
  client,
  request,
  ...params
}: ReactQueryAllBalancesProps): ReactQueryAllBalancesResponse => ({
  queryKey: [BANK_ALL_BALANCES_KEY, request.address],
  queryFn: async () => {
    if (!client) return undefined;
    return await client.cosmos.bank.v1beta1.allBalances(request);
  },
  ...params,
});
