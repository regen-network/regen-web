import { SellOrderInfo } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { CardSellOrder } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

export const getCreditsAvailablePerCurrency = (
  paymentOption: PaymentOptionsType,
  filteredCryptoSellOrders: Array<SellOrderInfo> | undefined,
  cardSellOrders: Array<CardSellOrder>,
) => {
  return paymentOption === PAYMENT_OPTIONS.CARD
    ? cardSellOrders.reduce((prev, cur) => prev + Number(cur.quantity), 0)
    : filteredCryptoSellOrders?.reduce(
        (prev, cur) => prev + Number(cur.quantity),
        0,
      ) || 0;
};

export function getSpendingCap(
  paymentOption: PaymentOptionsType,
  filteredCryptoSellOrders: SellOrderInfo[] | undefined,
  cardSellOrders: Array<CardSellOrder>,
) {
  return paymentOption === PAYMENT_OPTIONS.CARD
    ? cardSellOrders.reduce(
        (prev, cur) => prev + Number(cur.quantity) * cur.usdPrice,
        0,
      )
    : filteredCryptoSellOrders?.reduce(
        (prev, cur) => prev + Number(cur.quantity) * Number(cur.askAmount),
        0,
      ) || 0;
}
