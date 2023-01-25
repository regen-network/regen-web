import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { EEUR_DENOM, REGEN_DENOM } from 'config/allowedBaseDenoms';

import { Item } from 'web-components/lib/components/modal/ConfirmModal';

import { microToDenom } from 'lib/denom.utils';

import { GECKO_PRICES } from 'pages/Projects/hooks/useProjectsSellOrders.types';
import { UISellOrderInfo } from 'pages/Projects/Projects.types';

import { NormalizedSellOrder } from './Storefront.types';

/* sortBySellOrderId */

export const sortBySellOrderId = (
  sellOrderA: SellOrderInfo,
  sellOrderB: SellOrderInfo,
): number => {
  if (sellOrderA.id && sellOrderB.id) {
    return Number(sellOrderA.id) < Number(sellOrderB.id) ? 1 : -1;
  }

  return 0;
};

/* getCancelCardItems */

export const getCancelCardItems = ({
  id,
  amountAvailable,
  batchDenom,
}: NormalizedSellOrder): Item[] => [
  { label: 'sell order id:', value: { name: String(id) } },
  { label: 'quantity:', value: { name: String(amountAvailable) } },
  {
    label: 'batch denom:',
    value: {
      name: 'C01-20190101-20201010-003',
      url: `/credit-batches/${batchDenom}`,
    },
  },
];

/* checkIsBuyOrderInvalid */

type CheckIsBuyOrderInvalidParams = {
  sellOrders?: UISellOrderInfo[];
  creditCount?: number;
  sellOrderId?: string;
};
type CheckIsBuyOrderInvalidResponse = {
  isBuyOrderInvalid: boolean;
  amountAvailable: number;
};

export const checkIsBuyOrderInvalid = ({
  creditCount = 0,
  sellOrders,
  sellOrderId,
}: CheckIsBuyOrderInvalidParams): CheckIsBuyOrderInvalidResponse => {
  const currentSellOrder = sellOrders?.find(
    sellOrder => sellOrder.id === sellOrderId,
  );
  const quantityAfterOrder =
    Number(currentSellOrder?.quantity ?? 0) - creditCount;
  const isBuyOrderInvalid =
    sellOrderId !== undefined && (!currentSellOrder || quantityAfterOrder < 0);

  return {
    isBuyOrderInvalid,
    amountAvailable: Number(currentSellOrder?.quantity ?? 0),
  };
};

/* getAskUsdAmount */

type GetAskUsdAmountParams = {
  askAmount: string;
  askBaseDenom: string;
  quantity: string;
  geckoPrices?: GECKO_PRICES;
};

export const getAskUsdAmount = ({
  askAmount,
  askBaseDenom,
  quantity,
  geckoPrices,
}: GetAskUsdAmountParams): number => {
  const { eeurPrice, regenPrice, usdcPrice } = geckoPrices ?? {};
  let denomPrice = usdcPrice ?? 1;

  if (regenPrice && askBaseDenom === REGEN_DENOM) {
    denomPrice = regenPrice;
  }

  if (eeurPrice && askBaseDenom === EEUR_DENOM) {
    denomPrice = eeurPrice;
  }

  return (microToDenom(askAmount) / Number(quantity)) * denomPrice;
};
