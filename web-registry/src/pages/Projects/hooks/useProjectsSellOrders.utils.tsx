import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { PurchaseInfo } from 'web-components/lib/components/cards/ProjectCard/ProjectCard.types';

export const getPurchaseInfo = (
  projectId: string,
  sellOrders: SellOrderInfo[],
): PurchaseInfo => {
  const ordersForThisProject = sellOrders.filter(order =>
    order.batchDenom.startsWith(projectId),
  );
  if (!ordersForThisProject.length)
    return {
      sellInfo: {
        pricePerTon: `-`,
        creditsAvailable: 0,
      },
    };

  const creditsAvailable = ordersForThisProject
    .map(order => parseInt(order.quantity))
    .reduce((total, quantity) => total + quantity, 0);

  const prices = ordersForThisProject
    .map(order => parseInt(order.askAmount))
    .sort((a, b) => a - b);
  const priceMin = prices?.[0];
  const priceMax = prices?.[prices.length - 1];

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
      order.batchDenom.startsWith(projectA?.id),
    );
    const ordersForProjectB = sellOrders.filter(order =>
      order.batchDenom.startsWith(projectB?.id),
    );

    if (ordersForProjectA && !ordersForProjectB) return 1;
    if (!ordersForProjectA && ordersForProjectB) return -1;
    return 0;
  };
