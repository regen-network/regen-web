import { msg } from '@lingui/macro';
import { SellOrderInfo } from '@regen-network/api/regen/ecocredit/marketplace/v1/query';

import { Item } from 'web-components/src/components/modal/ConfirmModal';

import {
  DENOM_COINGECKO_ID_MAPPING,
  FetchSimplePriceResponse,
} from 'lib/coingecko';
import { microToDenom } from 'lib/denom.utils';
import { TranslatorType } from 'lib/i18n/i18n.types';

import { UISellOrderInfo } from 'legacy-pages/Projects/AllProjects/AllProjects.types';

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

type GetCancelCardItemsParams = {
  sellOrder: NormalizedSellOrder;
  _: TranslatorType;
};

export const getCancelCardItems = ({
  sellOrder,
  _,
}: GetCancelCardItemsParams): Item[] => {
  const { amountAvailable, batchDenom, id } = sellOrder;
  return [
    { label: _(msg`sell order id:`), value: { name: String(id) } },
    { label: _(msg`quantity:`), value: { name: String(amountAvailable) } },
    {
      label: _(msg`batch denom:`),
      value: {
        name: batchDenom,
        url: `/credit-batches/${batchDenom}`,
      },
    },
  ];
};

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
  geckoPrices: FetchSimplePriceResponse | null | void;
};

export const getAskUsdAmount = ({
  askAmount,
  askBaseDenom,
  geckoPrices,
}: GetAskUsdAmountParams): number => {
  const coingeckoId = DENOM_COINGECKO_ID_MAPPING[askBaseDenom];
  const denomPrice = geckoPrices?.[coingeckoId]?.usd ?? 0;

  return microToDenom(askAmount) * denomPrice;
};
