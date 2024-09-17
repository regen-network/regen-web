import { CardSellOrder } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';
import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

export const getCreditsAvailablePerCurrency = (
  paymentOption: PaymentOptionsType,
  filteredCryptoSellOrders: Array<UISellOrderInfo> | undefined,
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
  filteredCryptoSellOrders: Array<UISellOrderInfo> | undefined,
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
