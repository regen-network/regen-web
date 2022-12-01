import {
  ReactQueryBasketProps,
  ReactQueryBasketResponse,
} from './getBasketQuery.types';

export const getBasketQuery = ({
  client,
  request,
  ...params
}: ReactQueryBasketProps): ReactQueryBasketResponse => ({
  queryKey: ['basket', request.basketDenom],
  queryFn: async () => {
    if (!client) return undefined;
    return await client.Basket(request);
  },
  ...params,
});
