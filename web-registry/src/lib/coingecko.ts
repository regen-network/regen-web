import axios from 'axios';

type FetchSimplePriceParams = {
  ids: string;
  vsCurrencies: string;
};

export type FetchSimplePriceResponse = {
  [key: string]: { [key: string]: number };
};

export const GECKO_REGEN_ID = 'regen';
export const GECKO_USD_CURRENCY = 'USD';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/';

export const fetchSimplePrice = async ({
  ids,
  vsCurrencies,
}: FetchSimplePriceParams): Promise<FetchSimplePriceResponse> => {
  const result = await axios.get<FetchSimplePriceResponse>(
    `${COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`,
  );

  return result.data;
};
