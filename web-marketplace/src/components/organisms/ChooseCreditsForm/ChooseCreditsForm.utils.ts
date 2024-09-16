import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';

import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

export function getFilteredCryptoSellOrders(
  currency: Currency,
  groupCryptoSellOrders: Partial<Record<string, Array<SellOrderInfo>>>,
  retiring: boolean,
) {
  return groupCryptoSellOrders[currency]?.filter(
    order => retiring || order.disableAutoRetire,
  );
}
