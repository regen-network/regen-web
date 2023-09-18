import axios from 'axios';
import {
  AXELAR_USDC_DENOM,
  EEUR_DENOM,
  EVMOS_DENOM,
  GRAVITY_USDC_DENOM,
  REGEN_DENOM,
} from 'config/allowedBaseDenoms';

type FetchSimplePriceParams = {
  ids: string;
  vsCurrencies: string;
};

export type FetchSimplePriceResponse = {
  [key: string]: { [key: string]: number };
};

export const GECKO_REGEN_ID = 'regen';
export const GECKO_EEUR_ID = 'e-money-eur';
export const GECKO_USDC_ID = 'usd-coin';
export const GECKO_EVMOS_ID = 'evmos';
export const GECKO_TOKEN_IDS = `${GECKO_REGEN_ID},${GECKO_EEUR_ID},${GECKO_USDC_ID},${GECKO_EVMOS_ID}`;
export const GECKO_USD_CURRENCY = 'USD';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/';
export const DENOM_COINGECKO_ID_MAPPING = {
  [REGEN_DENOM]: GECKO_REGEN_ID,
  [EEUR_DENOM]: GECKO_EEUR_ID,
  [AXELAR_USDC_DENOM]: GECKO_USDC_ID,
  [GRAVITY_USDC_DENOM]: GECKO_USDC_ID,
  [EVMOS_DENOM]: GECKO_EVMOS_ID,
};

export const fetchSimplePrice = async ({
  ids,
  vsCurrencies,
}: FetchSimplePriceParams): Promise<FetchSimplePriceResponse> => {
  const result = await axios.get<FetchSimplePriceResponse>(
    `${COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`,
  );

  return result.data;
};
