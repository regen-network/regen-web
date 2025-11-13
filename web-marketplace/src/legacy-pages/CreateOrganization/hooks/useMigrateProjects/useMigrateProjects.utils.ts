import { DeliverTxResponse } from '@cosmjs/stargate';
import { EventSell } from '@regen-network/api/regen/ecocredit/marketplace/v1/events';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

export const getSelectedCardSellOrdersWithNewIds = (
  deliverTxResponse: DeliverTxResponse | undefined,
  selectedSellOrders: SellOrderInfoExtented[],
  selectedProjects: NormalizeProject[],
  walletAddress: string,
) => {
  // Get new sell order ids from EventSell's
  // sorted by ascending id
  const newSellOrderIds = deliverTxResponse?.events
    .filter(event => event.type === EventSell.typeUrl.replace('/', ''))
    .flatMap(
      event =>
        event.attributes
          .filter(attr => attr.key === 'sell_order_id')
          .map(attr => attr.value.replace(/"/g, '')), // remove quotes if needed
    );

  // Map old sell order ids to new ones
  const sellOrderIdMap: Record<string, string> = {};
  selectedSellOrders.forEach((order, index) => {
    const oldId = String(order.id);
    const newId = newSellOrderIds ? newSellOrderIds[index] : undefined;
    if (newId) {
      sellOrderIdMap[oldId] = newId;
    }
  });

  const selectedCardSellOrders = (
    selectedProjects
      .flatMap(project => project.allCardSellOrders)
      .filter(
        order => !!order && order.seller === walletAddress,
      ) as CardSellOrder[]
  ).map(order => ({ ...order, newId: sellOrderIdMap[order.id] }));

  return selectedCardSellOrders;
};
