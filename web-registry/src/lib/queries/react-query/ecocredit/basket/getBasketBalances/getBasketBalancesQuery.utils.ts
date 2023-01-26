import { BASKET_BALANCES_KEY } from './getBasketBalancesQuery.constants';

type Params = {
  basketDenom?: string;
  pagination: { offset: string; limit: string };
};

export const getBasketBalancesQueryKey = ({
  basketDenom,
  pagination,
}: Params): string[] => [
  BASKET_BALANCES_KEY,
  basketDenom ?? '',
  pagination?.offset,
  pagination?.limit,
];
