import {
  fetchSimplePrice,
  GECKO_TOKEN_IDS,
  GECKO_USD_CURRENCY,
} from 'lib/coingecko';

import {
  ReactQuerySimplePriceParams,
  ReactQuerySimplePriceResponse,
} from './simplePriceQuery.types';

export const getSimplePriceQuery = ({
  ...params
}: ReactQuerySimplePriceParams): ReactQuerySimplePriceResponse => ({
  queryKey: ['regenPrice'],
  queryFn: async () => {
    const simplePrice = await fetchSimplePrice({
      ids: GECKO_TOKEN_IDS,
      vsCurrencies: GECKO_USD_CURRENCY,
    });

    return simplePrice;
  },
  ...params,
});
