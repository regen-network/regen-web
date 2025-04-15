import {
  ReactQueryBasketsProps,
  ReactQueryBasketsResponse,
} from './getBasketsQuery.types';

export const getBasketsQuery = ({
  client,
  request,
  ...params
}: ReactQueryBasketsProps): ReactQueryBasketsResponse => ({
  queryKey: ['baskets'],
  queryFn: async () => {
    if (!client) return undefined;
    return await client.regen.ecocredit.basket.v1.baskets(request);
  },
  ...params,
});
