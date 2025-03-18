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
  queryKey: [
    getBasketBalancesQueryKey({
      basketDenom: request.basketDenom,
      pagination: {
        limit: String(request.pagination?.limit ?? 0),
        offset: String(request.pagination?.offset ?? 0),
      },
    }),
  ],
  queryFn: async () => {
    if (!client) return null;
    return await client.regen.ecocredit.basket.v1.basketBalances(request);
  },
  ...params,
});
