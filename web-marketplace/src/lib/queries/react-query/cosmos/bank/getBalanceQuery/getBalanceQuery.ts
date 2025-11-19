import { getBalanceQueryKey } from './getBalanceQuery.utils';
import {
  ReactQueryBalanceProps,
  ReactQueryBalanceResponse,
} from './getBalanceQuery.types';

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
