import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

export function getFilteredCryptoSellOrders(
  askDenom: string,
  cryptoSellOrders: Array<UISellOrderInfo>,
  retiring: boolean,
) {
  return cryptoSellOrders?.filter(
    order =>
      order.askAmount === askDenom && (retiring || order.disableAutoRetire),
  );
}
