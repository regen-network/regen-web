import {
  ReactQueryBalanceProps,
  ReactQueryBalanceResponse,
} from './getBalanceQuery.types';
import { getBalanceQueryKey } from './getBalanceQuery.utils';

export const getBalanceQuery = ({
  client,
  request,
  ...params
}: ReactQueryBalanceProps): ReactQueryBalanceResponse => ({
  queryKey: getBalanceQueryKey(request),
  queryFn: async () => {
    if (!client || !request.address || !request.denom) return null;
    return await client.cosmos.bank.v1beta1.balance(request);
  },
  ...params,
});
