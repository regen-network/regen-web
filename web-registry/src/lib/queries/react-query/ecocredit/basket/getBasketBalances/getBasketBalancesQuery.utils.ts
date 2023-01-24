import { BASKET_BALANCES_KEY } from './getBasketBalancesQuery.constants';

export const getBasketBalancesQueryKey = (basketDenom: string): string[] => [
  BASKET_BALANCES_KEY,
  basketDenom,
];
