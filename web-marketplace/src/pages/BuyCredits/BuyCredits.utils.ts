import { i18n } from '@lingui/core';
import { msg, plural } from '@lingui/macro';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { HandleSaveType } from 'components/templates/MultiStepTemplate/MultiStep.context';

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

export const getCreditsAvailableBannerText = (creditsAvailable: number) => {
  const formattedCreditsAvailable = i18n.number(creditsAvailable);
  return plural(creditsAvailable, {
    one: `Only ${formattedCreditsAvailable} credit available with those paramaters, order quantity changed`,
    other: `Only ${formattedCreditsAvailable} credits available with those paramaters, order quantity changed`,
  });
};

/*
 * Uses `handleSave` to update `useMultiStep`'s `data.currency`, ensuring consistent
 * access to the selected currency in `BuyCredits.Form`. This enables
 * `BuyCredits.Form` to fetch and pass the correct `userBalance` to `ChooseCredits.Form`
 * and `OrderSummary.Card`.
 *
 * This approach is necessary because we currently don’t have access to the updated `data`
 * until users reach step 2 of the buy credits flow.
 */
export function updateMultiStepCurrency(
  handleSave: HandleSaveType<BuyCreditsSchemaTypes>,
  data: BuyCreditsSchemaTypes,
  currency: { askDenom: string; askBaseDenom: string },
  activeStep: number,
) {
  handleSave(
    {
      ...data,
      currency,
    },
    activeStep,
  );
}
