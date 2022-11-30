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
    if (!client) return undefined;
    return await client.Balance(request);
  },
  ...params,
});
