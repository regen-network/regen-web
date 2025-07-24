import {
  DENOM_COINGECKO_ID_MAPPING,
  FetchSimplePriceResponse,
} from 'lib/coingecko';
import { microToDenom } from 'lib/denom.utils';

import { SELL_ORDERS_BY_SELLER_KEY } from './getSellOrdersBySellerQuery.constants';

export const getSellOrdersBySellerKey = (
  sellerAddress: string,
  offset?: string,
  limit?: string,
): string[] => [
  SELL_ORDERS_BY_SELLER_KEY,
  sellerAddress,
  ...(offset ? [offset] : []),
  ...(limit ? [limit] : []),
];

type GetAskUsdAmountParams = {
  askAmount: string;
  askBaseDenom: string;
  quantity: string;
  geckoPrices: FetchSimplePriceResponse | null | void;
};

export const getAskUsdAmount = ({
  askAmount,
  askBaseDenom,
  geckoPrices,
}: GetAskUsdAmountParams): number => {
  const coingeckoId = DENOM_COINGECKO_ID_MAPPING[askBaseDenom];
  const denomPrice = geckoPrices?.[coingeckoId]?.usd ?? 0;

  return microToDenom(askAmount) * denomPrice;
};
