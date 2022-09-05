import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { PurchaseInfo } from 'web-components/lib/components/cards/ProjectCard/ProjectCard.types';
import { formatNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

export const getPurchaseInfo = (
  projectId: string,
  sellOrders: SellOrderInfo[],
): PurchaseInfo => {
  const ordersForThisProject = sellOrders.filter(order =>
    order.batchDenom.startsWith(projectId),
  );
  if (!ordersForThisProject.length) {
    return {
      sellInfo: {
        pricePerTon: `-`,
        creditsAvailable: 0,
      },
    };
  }

  const creditsAvailable = ordersForThisProject
    .map(order => parseInt(order.quantity))
    .reduce((total, quantity) => total + quantity, 0);

  const prices = ordersForThisProject
    .map(order => microToDenom(order.askAmount))
    .sort((a, b) => a - b);
  const priceMin = formatNumber(prices?.[0], 2);
  const priceMax = formatNumber(prices?.[prices.length - 1], 2);

  return {
    sellInfo: {
      pricePerTon: `${priceMin}-${priceMax}`,
      creditsAvailable,
    },
  };
};

export const sortProjectsBySellOrdersAvailability =
  (sellOrders: SellOrderInfo[]) =>
  (projectA: ProjectInfo, projectB: ProjectInfo) => {
    const ordersForProjectA = sellOrders.filter(order =>
      order.batchDenom.startsWith(`${projectA?.id}-`),
    );
    const ordersForProjectB = sellOrders.filter(order =>
      order.batchDenom.startsWith(`${projectB?.id}-`),
    );

    if (ordersForProjectA && !ordersForProjectB) return 1;
    if (!ordersForProjectA && ordersForProjectB) return -1;
    return 0;
  };
