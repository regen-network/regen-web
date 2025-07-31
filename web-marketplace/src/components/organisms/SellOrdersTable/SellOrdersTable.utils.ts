import { EUR_DENOMS, USD_DENOMS } from 'config/allowedBaseDenoms';

import { SellOrderStatus } from '../UserSellOrders/hooks/useNormalizedSellOrders';

type getSellOrderColorProps = {
  sellOrderStatus?: SellOrderStatus;
};

export const getSellOrderColor = ({
  sellOrderStatus,
}: getSellOrderColorProps): string => {
  switch (sellOrderStatus) {
    case 'Not yet filled':
      return 'warning.light';
    case 'Partially filled':
      return 'secondary.light';
    case 'Filled':
      return 'secondary.contrastText';
    case 'Expired':
      return 'orange.contrastText';
    case 'Cancelled':
      return 'error.light';
    default:
      return 'warning.light';
  }
};

type GetDenomCurrencyPrefixParams = {
  baseDenom: string;
};
export const getDenomCurrencyPrefix = ({
  baseDenom,
}: GetDenomCurrencyPrefixParams): string => {
  if (USD_DENOMS.includes(baseDenom)) return '$';
  if (EUR_DENOMS.includes(baseDenom)) return '€';

  return '';
};
