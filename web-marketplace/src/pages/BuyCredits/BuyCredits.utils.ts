import { i18n } from '@lingui/core';
import { msg, plural } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { PaymentOptionsType } from './BuyCredits.types';

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
  const nameStep1 = _(msg`Choose credits`);
  const nameStep2 =
    paymentOption === PAYMENT_OPTIONS.CARD
      ? _(msg`Payment info`)
      : _(msg`Customer info`);
  const nameStep3 = retiring ? _(msg`Retirement`) : _(msg`Agree & purchase`);
  const descriptionStep3 = retiring
    ? _(
        msg`Retirement permanently removes used credits from circulation to prevent their reuse, ensuring that the environmental benefit claimed is real and not double-counted.`,
      )
    : undefined;

  return {
    formId: `buy-credits-${projectId}`,
    steps: [
      {
        id: 'choose-credits',
        name: nameStep1,
        title: nameStep1,
      },
      {
        id: 'payment-customer-info',
        name: nameStep2,
        title: nameStep2,
      },
      {
        id: 'agree-purchase',
        name: nameStep3,
        title: nameStep3,
        description: descriptionStep3,
      },
      { id: 'complete', name: _(msg`Complete`) },
    ],
  };
};

export const getCreditsAvailableBannerText = (creditsAvailable: number) => {
  const formattedCreditsAvailable = i18n.number(creditsAvailable);
  return plural(creditsAvailable, {
    one: `Only ${formattedCreditsAvailable} credit available with those paramaters, order quantity changed`,
    other: `Only ${formattedCreditsAvailable} credits available with those paramaters, order quantity changed`,
  });
};
