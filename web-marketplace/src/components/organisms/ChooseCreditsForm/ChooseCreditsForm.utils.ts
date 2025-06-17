import { UISellOrderInfo } from 'legacy-pages/Projects/AllProjects/AllProjects.types';

export function getFilteredCryptoSellOrders({
  askDenom,
  cryptoSellOrders,
  retiring,
}: {
  askDenom?: string;
  cryptoSellOrders: Array<UISellOrderInfo>;
  retiring: boolean;
}) {
  return cryptoSellOrders?.filter(
    order =>
      order.askDenom === askDenom && (retiring || order.disableAutoRetire),
  );
}
