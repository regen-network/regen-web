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
    if (!client || !request.address || !request.denom) return null;
    return await client.cosmos.bank.v1beta1.balance(request);
  },
  ...params,
});
