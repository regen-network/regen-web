import {
  ReactQueryBalanceProps,
  ReactQueryBalanceResponse,
} from './getBalanceQuery.types';

export const getBalanceQuery = ({
  client,
  request,
  ...params
}: ReactQueryBalanceProps): ReactQueryBalanceResponse => ({
  queryKey: ['balance'],
  queryFn: async () => {
    if (!client) return;
    return await client.Balance(request);
  },
  ...params,
});
