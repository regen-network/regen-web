import { msg } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { PaymentOptionsType } from './BuyCredits.types';

type GetFormModelParams = {
  _: TranslatorType;
  paymentOption: PaymentOptionsType;
  retiring: boolean;
};
export const getFormModel = ({
  _,
  paymentOption,
  retiring,
}: GetFormModelParams) => {
  return {
    formId: 'buy-credits',
    steps: [
      {
        id: 'choose-credits',
        name: _(msg`Choose credits`),
        // schema: TODO
      },
      {
        id: 'payment-customer-info',
        name:
          paymentOption === PAYMENT_OPTIONS.CARD
            ? _(msg`Payment info`)
            : _(msg`Choose info`),
      },
      {
        id: 'retirement-agree',
        name: retiring ? _(msg`Retirement`) : _(msg`Agree & purchase`),
      },
    ],
  };
};
