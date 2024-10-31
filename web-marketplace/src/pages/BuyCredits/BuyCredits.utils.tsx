import { i18n } from '@lingui/core';
import { msg, plural } from '@lingui/macro';

import { getFormattedNumber } from 'web-components/src/utils/format';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { HandleSaveType } from 'components/templates/MultiStepTemplate/MultiStep.context';

import {
  AGREE_PURCHASE,
  CHOOSE_CREDITS,
  COMPLETE,
  CUSTOMER_INFO,
  PAYMENT_INFO,
  PAYMENT_OPTIONS,
  RETIREMENT,
} from './BuyCredits.constants';
import { BuyCreditsSchemaTypes, PaymentOptionsType } from './BuyCredits.types';

type GetFormModelParams = {
  paymentOption: PaymentOptionsType;
  retiring: boolean;
  projectId: string;
};

const getStep2Name = (card: boolean) =>
  card ? i18n._(PAYMENT_INFO) : i18n._(CUSTOMER_INFO);

const getStep3Name = (retiring: boolean) =>
  retiring ? i18n._(RETIREMENT) : i18n._(AGREE_PURCHASE);

export const getSteps = (
  paymentOption: PaymentOptionsType,
  retiring: boolean,
) => [
  i18n._(CHOOSE_CREDITS),
  getStep2Name(paymentOption === PAYMENT_OPTIONS.CARD),
  getStep3Name(retiring),
  i18n._(COMPLETE),
];

export const getFormModel = ({
  paymentOption,
  retiring,
  projectId,
}: GetFormModelParams) => {
  const nameStep1 = i18n._(CHOOSE_CREDITS);
  const nameStep2 = getStep2Name(paymentOption === PAYMENT_OPTIONS.CARD);
  const nameStep3 = getStep3Name(retiring);
  const descriptionStep3 = retiring
    ? i18n._(
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
      { id: 'complete', name: i18n._(COMPLETE) },
    ],
  };
};

/*
 * Uses `handleSave` to update `useMultiStep`'s `data.currency` and `data.paymentOption`,
 * ensuring consistent access to the selected currency and payment option in `BuyCredits.Form`.
 * This enables `BuyCredits.Form` to fetch and pass the correct `userBalance` to `ChooseCredits.Form`
 * and `OrderSummary.Card` and to keep data.paymentOption sync.
 *
 * This approach is necessary because we currently don’t have access to the updated `useMultiStep`'s `data`
 * until users reach step 2 of the buy credits flow.
 */
export function updateMultiStepCurrencyAndPaymentOption(
  handleSave: HandleSaveType<BuyCreditsSchemaTypes>,
  data: BuyCreditsSchemaTypes,
  currency: { askDenom: string; askBaseDenom: string },
  activeStep: number,
  option: string,
) {
  handleSave(
    {
      ...data,
      paymentOption: option,
      currency,
    },
    activeStep,
  );
}

export function getCryptoCurrencies(cryptoSellOrders: UISellOrderInfo[]) {
  return cryptoSellOrders
    .map(order => ({
      askDenom: order.askDenom,
      askBaseDenom: order.askBaseDenom,
    }))
    .filter(
      (obj1, i, arr) =>
        arr.findIndex(obj2 => obj2.askDenom === obj1.askDenom) === i,
    );
}

type GetCardItemsParams = {
  retiring: boolean;
  creditsAmount: number;
  currencyAmount: number;
  project: NormalizeProject;
  currency: Currency;
  displayDenom: string;
};
export const getCardItems = ({
  retiring,
  creditsAmount,
  currencyAmount,
  project,
  currency,
  displayDenom,
}: GetCardItemsParams) => [
  {
    label: i18n._(msg`total purchase price`),
    value: {
      children: (
        <AmountWithCurrency
          amount={currencyAmount}
          currency={currency}
          displayDenom={displayDenom}
          classes={
            {
              // root: 'justify-start',
              // denom: 'pt-[8px] text-[14px] sm:text-base',
            }
          }
        />
      ),
    },
  },
  {
    label: i18n._(msg`project`),
    value: {
      name: project.name,
      url: `/project/${project.id}`,
    },
  },
  {
    label: retiring
      ? i18n._(msg`amount retired`)
      : i18n._(msg`amount tradable`),
    value: { name: getFormattedNumber(creditsAmount) },
  },
];

export const getCreditsAvailableBannerText = (creditsAvailable: number) => {
  const formattedCreditsAvailable = i18n.number(creditsAvailable);
  return plural(creditsAvailable, {
    one: `Only ${formattedCreditsAvailable} credit available with those paramaters, order quantity changed`,
    other: `Only ${formattedCreditsAvailable} credits available with those paramaters, order quantity changed`,
  });
};
