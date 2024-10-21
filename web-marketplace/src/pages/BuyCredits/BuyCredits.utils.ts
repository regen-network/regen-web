import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from './BuyCredits.types';

type GetFormModelParams = {
  _: TranslatorType;
  paymentOption: PaymentOptionsType;
  retiring: boolean;
  projectId: string;
};
export const getFormModel = ({
  _,
  paymentOption,
  retiring,
  projectId,
}: GetFormModelParams) => {
  return {
    formId: `buy-credits-${projectId}`,
    steps: [
      {
        id: 'choose-credits',
        name: _(msg`Choose credits`),
      },
      {
        id: 'payment-customer-info',
        name:
          paymentOption === PAYMENT_OPTIONS.CARD
            ? _(msg`Payment info`)
            : _(msg`Customer info`),
      },
      {
        id: 'agree-purchase',
        name: retiring ? _(msg`Retirement`) : _(msg`Agree & purchase`),
      },
      { id: 'complete', name: _(msg`Complete`) },
    ],
  };
};

export const findMatchingSellOrders = (
  data: BuyCreditsSchemaTypes,
  sellOrders: UISellOrderInfo[] | undefined,
) => {
  if (!sellOrders) return [];

  const sellOrderIds = data?.sellOrders?.map(order => order.sellOrderId);

  return sellOrders.filter(order => sellOrderIds?.includes(order.id));
};
