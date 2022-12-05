import { BANK_BALANCE_KEY } from './getBalanceQuery.constants';
import {
  ReactQueryBalanceProps,
  ReactQueryBalanceResponse,
} from './getBalanceQuery.types';

export const getBalanceQuery = ({
  client,
  request,
  ...params
}: ReactQueryBalanceProps): ReactQueryBalanceResponse => ({
  queryKey: [BANK_BALANCE_KEY, request.address, request.denom],
  queryFn: async () => {
    if (!client) return undefined;
    return await client.Balance(request);
  },
  ...params,
});
