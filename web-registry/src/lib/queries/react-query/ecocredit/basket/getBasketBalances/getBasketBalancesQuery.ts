import {
  ReactQueryBasketBalancesProps,
  ReactQueryBasketBalancesResponse,
} from './getBasketBalancesQuery.types';
import { getBasketBalancesQueryKey } from './getBasketBalancesQuery.utils';

export const getBasketBalancesQuery = ({
  client,
  request,
  ...params
}: ReactQueryBasketBalancesProps): ReactQueryBasketBalancesResponse => ({
  queryKey: [getBasketBalancesQueryKey(request.basketDenom ?? '')],
  queryFn: async () => {
    if (!client) return null;
    return await client.BasketBalances(request);
  },
  ...params,
});
