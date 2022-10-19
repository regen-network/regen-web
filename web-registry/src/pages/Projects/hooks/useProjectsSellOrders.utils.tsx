import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { EEUR_DENOM, REGEN_DENOM } from 'config/allowedBaseDenoms';
import { QUANTITY_MAX_DECIMALS } from 'config/decimals';
import { roundFloatNumber } from 'utils/number/format/format';

import { PurchaseInfo } from 'web-components/lib/components/cards/ProjectCard/ProjectCard.types';
import { formatNumber } from 'web-components/lib/utils/format';

import { microToDenom } from 'lib/denom.utils';

import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

import { UISellOrderInfo } from '../Projects.types';
import { GECKO_PRICES } from './useProjectsSellOrders.types';

type GetPurchaseInfoParams = {
  projectId: string;
  sellOrders: SellOrderInfoExtented[];
  geckoPrices?: GECKO_PRICES;
  userAddress?: string;
};

export const getPurchaseInfo = ({
  projectId,
  sellOrders,
  geckoPrices = {},
  userAddress,
}: GetPurchaseInfoParams): PurchaseInfo => {
  const ordersForThisProject = sellOrders.filter(order =>
    order.batchDenom.startsWith(projectId),
  );
  if (!ordersForThisProject.length) {
    return {
      sellInfo: {
        pricePerTon: `-`,
        creditsAvailable: 0,
        creditsAvailableForUser: 0,
      },
    };
  }
  const { eeurPrice, regenPrice, usdcPrice } = geckoPrices;

  const creditsAvailable = ordersForThisProject
    .map(order => parseFloat(order.quantity))
    .reduce((total, quantity) => total + quantity, 0);

  const creditsAvailableForUser = ordersForThisProject
    .filter(order => order.seller !== userAddress)
    .map(order => parseFloat(order.quantity))
    .reduce((total, quantity) => total + quantity, 0);

  const prices = ordersForThisProject
    .map(order => {
      const amount = microToDenom(order.askAmount);
      let denomPrice = usdcPrice ?? 1;

      if (order.askBaseDenom === REGEN_DENOM) {
        denomPrice = regenPrice ?? 0;
      }
      if (order.askBaseDenom === EEUR_DENOM) {
        denomPrice = eeurPrice ?? 0;
      }

      return amount * denomPrice;
    })
    .sort((a, b) => a - b);

  const priceMin = prices?.[0];
  const priceMax = prices?.[prices.length - 1];
  const priceMinDisplayed =
    priceMin > 0
      ? formatNumber({
          num: priceMin,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '';
  const priceMaxDisplayed =
    priceMax > 0
      ? formatNumber({
          num: priceMax,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '';
  const hasPrice = priceMinDisplayed !== '' && priceMaxDisplayed !== '';

  return {
    sellInfo: {
      pricePerTon: hasPrice ? `$${priceMinDisplayed}-${priceMaxDisplayed}` : '',
      creditsAvailable: roundFloatNumber(creditsAvailable, {
        decimals: QUANTITY_MAX_DECIMALS,
      }),
      creditsAvailableForUser: roundFloatNumber(creditsAvailableForUser, {
        decimals: QUANTITY_MAX_DECIMALS,
      }),
    },
  };
};

// This comparison function prioritizes (it puts first) the projects that have sell orders.
export const sortProjectsBySellOrdersAvailability =
  (sellOrders: SellOrderInfo[]) =>
  (projectA: ProjectInfo, projectB: ProjectInfo) => {
    const ordersForProjectA = sellOrders.some(order =>
      order.batchDenom.startsWith(`${projectA?.id}-`),
    );
    const ordersForProjectB = sellOrders.some(order =>
      order.batchDenom.startsWith(`${projectB?.id}-`),
    );

    if (ordersForProjectA && !ordersForProjectB) return -1;
    if (!ordersForProjectA && ordersForProjectB) return 1;
    return 0;
  };

export const normalizeToUISellOrderInfo = (
  sellOrder: SellOrderInfoExtented,
): UISellOrderInfo => ({
  ...sellOrder,
  id: String(sellOrder.id),
});
