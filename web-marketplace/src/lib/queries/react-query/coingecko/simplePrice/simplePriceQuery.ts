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
  request: { ids = GECKO_TOKEN_IDS, vsCurrencies = GECKO_USD_CURRENCY } = {},
  ...params
}: ReactQuerySimplePriceParams): ReactQuerySimplePriceResponse => ({
  queryKey: ['simplePrice', GECKO_TOKEN_IDS],
  queryFn: async () => {
    try {
      const simplePrice = await fetchSimplePrice({
        ids,
        vsCurrencies,
      });

      return simplePrice;
    } catch (e) {
      return null;
    }
  },
  ...params,
});
