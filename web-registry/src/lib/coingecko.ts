import axios, { AxiosResponse } from 'axios';

type FetchSimplePriceParams = {
  ids: string;
  vsCurrencies: string;
};

export type FetchSimplePriceResponse = {
  [key: string]: { [key: string]: number };
};

export const GECKO_REGEN_ID = 'regen';
export const GECKO_USD_CURRENCY = 'USD';

export const fetchSimplePrice = async ({
  ids,
  vsCurrencies,
}: FetchSimplePriceParams): Promise<FetchSimplePriceResponse> => {
  const result: AxiosResponse<FetchSimplePriceResponse> = await axios
    .get<FetchSimplePriceResponse>(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`,
    )
    .then(response => {
      return response;
    });

  return result.data;
};
