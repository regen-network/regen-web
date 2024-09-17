import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

export function getFilteredCryptoSellOrders(
  currency: Currency,
  groupCryptoSellOrders: Partial<Record<string, Array<UISellOrderInfo>>>,
  retiring: boolean,
) {
  return groupCryptoSellOrders[currency]?.filter(
    order => retiring || order.disableAutoRetire,
  );
}
