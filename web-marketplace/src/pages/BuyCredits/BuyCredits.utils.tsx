import { UseFormSetValue } from 'react-hook-form';
import { i18n } from '@lingui/core';
import { msg, plural, Trans } from '@lingui/macro';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { USD_DENOM } from 'config/allowedBaseDenoms';

import { getFormattedNumber } from 'web-components/src/utils/format';

import { TranslatorType } from 'lib/i18n/i18n.types';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';
import {
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
  MIN_USD_CURRENCY_AMOUNT,
  SELL_ORDERS,
} from 'components/molecules/CreditsAmount/CreditsAmount.constants';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { getCurrencyAmount } from 'components/molecules/CreditsAmount/CreditsAmount.utils';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { KEPLR_LOGIN_REQUIRED } from 'components/organisms/BuyWarningModal/BuyWarningModal.constants';
import { BuyWarningModalContent } from 'components/organisms/BuyWarningModal/BuyWarningModal.types';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

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

export const findMatchingSellOrders = (
  data: BuyCreditsSchemaTypes,
  sellOrders: UISellOrderInfo[] | undefined,
) => {
  if (!sellOrders) return [];

  const sellOrderIds = data?.sellOrders?.map(order => order.sellOrderId);

  return sellOrders.filter(order => sellOrderIds?.includes(order.id));
};

export const getOrderedSellOrders = (
  isCard: boolean,
  cardSellOrders: CardSellOrder[],
  filteredCryptoSellOrders: UISellOrderInfo[],
): UISellOrderInfo[] => {
  return isCard
    ? cardSellOrders.sort((a, b) => a.usdPrice - b.usdPrice)
    : filteredCryptoSellOrders?.sort(
        (a, b) => Number(a.askAmount) - Number(b.askAmount),
      ) || [];
};

export const getWarningModalContent = (
  currency: { askDenom: string; askBaseDenom: string } | undefined,
  creditsInRequestedSellOrders: number,
  _: TranslatorType,
  allowedDenomsData: QueryAllowedDenomsResponse | undefined,
  data: BuyCreditsSchemaTypes,
  creditsInAllSellOrders: number | undefined,
): BuyWarningModalContent | undefined => {
  if (
    currency?.askDenom === USD_DENOM &&
    !creditsInRequestedSellOrders &&
    creditsInAllSellOrders
  ) {
    return {
      modalContent: {
        title: _(
          msg`Sorry, another user has purchased all of the USD credits you selected!`,
        ),
        content: (
          <>
            <p className="uppercase font-muli text-sm font-extrabold pb-10">
              <Trans>amount now available in usd</Trans>
            </p>
            <span>{creditsInRequestedSellOrders}</span>
          </>
        ),
        buttons: [
          {
            text: _(msg`find another credit card project`),
            action: '/projects',
            type: 'contained',
          },
          {
            text: _(msg`or, buy with crypto`),
            action: KEPLR_LOGIN_REQUIRED,
            type: 'outlined',
          },
        ],
      },
    };
  } else if (!creditsInAllSellOrders) {
    // no credits available
    return {
      modalContent: {
        title: _(
          msg`Sorry, another user has purchased all of the available credits from this project`,
        ),
        content: (
          <p className="text-lg pb-10 text-center">
            <Trans>
              Because we use blockchain technology, if another user purchases
              the credits before you check out, you’ll need to choose different
              credits.
            </Trans>
          </p>
        ),
        buttons: [
          {
            text: _(msg`search for new credits`),
            action: '/projects',
            type: 'outlined',
          },
        ],
      },
    };
  } else if (creditsInRequestedSellOrders >= 0) {
    // some credits available
    return {
      modalContent: {
        title: _(
          msg`Sorry, another user has purchased some or all of the credits you selected!`,
        ),
        content: (
          <>
            <p className="uppercase font-muli text-sm font-extrabold pb-10">
              <Trans>amount now available in</Trans>
              {` ${findDisplayDenom({
                allowedDenoms: allowedDenomsData?.allowedDenoms,
                bankDenom: data?.currency?.askDenom!,
                baseDenom: data?.currency?.askBaseDenom!,
              })}`}
            </p>
            <span>{creditsInRequestedSellOrders}</span>
          </>
        ),
        buttons: [
          {
            text: _(msg`Choose new credits`),
            action: null,
            type: 'outlined',
          },
        ],
      },
    };
  }
};

export const getSellOrdersCredits = (
  sellOrders: UISellOrderInfo[] | SellOrderInfoExtented[] | undefined,
) => {
  return (
    sellOrders?.reduce(
      (credits, sellOrder) => credits + Number(sellOrder.quantity),
      0,
    ) || 0
  );
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

export const getCreditsAvailableBannerText = (
  creditsAvailable: number,
  displayDenom: string,
) => {
  const formattedCreditsAvailable = i18n.number(creditsAvailable, {
    maximumFractionDigits: 6,
  });
  return plural(creditsAvailable, {
    one: `Credit amount adjusted: Only ${formattedCreditsAvailable} credit available in ${displayDenom}`,
    other: `Credit amount adjusted: Only ${formattedCreditsAvailable} credits available in ${displayDenom}`,
  });
};

/**
 * Resets the sell orders and the currency and credits amounts in both
 * the buy credits form and the multiStep localStorage based on the provided data.
 *
 * @param paymentOption - The current selected payment option.
 * @param orderedSellOrders - The list of sell orders.
 * @param creditTypePrecision - The precision of the credit type.
 * @param setValue - Function to set form values in react hook form.
 * @param updateMultiStepData  - Function to update multiStep localStorage data (multiStep handleSave function).
 * @param data - The multiStep data.
 * @param activeStep - The current multiStep active step.
 * @param currentCreditsAmount - The current amount of credits (optional).
 */
export function resetCurrencyAndCredits(
  paymentOption: string,
  orderedSellOrders: UISellOrderInfo[] | CardSellOrder[],
  creditTypePrecision: number | null | undefined,
  setValue: UseFormSetValue<any>,
  updateMultiStepData: (
    formValues: {} | BuyCreditsSchemaTypes,
    nextStep: number,
    dataDisplay?: any,
  ) => void,
  data: BuyCreditsSchemaTypes,
  activeStep: number,
  currentCreditsAmount: number = 1,
) {
  const { currencyAmount, sellOrders } = getCurrencyAmount({
    currentCreditsAmount,
    card: paymentOption === PAYMENT_OPTIONS.CARD,
    orderedSellOrders,
    creditTypePrecision,
  });

  let newCreditsAmount = currentCreditsAmount;
  let newCurrencyAmount = currencyAmount;

  if (
    newCurrencyAmount < MIN_USD_CURRENCY_AMOUNT &&
    paymentOption === PAYMENT_OPTIONS.CARD
  ) {
    newCreditsAmount = calculateCredits(
      orderedSellOrders as CardSellOrder[],
      MIN_USD_CURRENCY_AMOUNT,
    );
    newCurrencyAmount = MIN_USD_CURRENCY_AMOUNT;
  }

  setValue(CURRENCY_AMOUNT, newCurrencyAmount, {
    shouldValidate: true,
  });
  setValue(CREDITS_AMOUNT, newCreditsAmount, { shouldValidate: true });
  setValue(SELL_ORDERS, sellOrders);

  updateMultiStepData(
    {
      ...data,
      creditsAmount: newCreditsAmount,
      currencyAmount: newCurrencyAmount,
      sellOrders,
    },
    activeStep,
  );
}

/**
 * Calculates the maximum number of credits that can be bought
 * for an exact target amount by iterating ordered sell orders.
 *
 * @param orderedSellOrders - List of available sell orders by ascending price
 * @param targetAmount - Exact max amount to spend
 * @returns Total credits purchasable, rounded to 2 decimals
 */
function calculateCredits(
  orderedSellOrders: CardSellOrder[],
  targetAmount: number,
) {
  let totalCost = 0;
  let totalCredits = 0;

  for (const order of orderedSellOrders) {
    const pricePerCredit = order.usdPrice;
    const availableCredits = Number(order.quantity);

    // Calculate remaining budget for this iteration
    const remainingBudget = targetAmount - totalCost;
    if (remainingBudget <= 0) break;

    // Calculate how many credits we can buy with remaining budget
    const creditsNeeded = remainingBudget / pricePerCredit;
    // Take either all credits needed or all available, whichever is less
    const creditsToTake = Math.min(creditsNeeded, availableCredits);

    totalCredits += creditsToTake;
    totalCost += creditsToTake * pricePerCredit;

    // Check if we've hit our target amount exactly
    // Using small epsilon (0.000001) to handle floating point precision issues
    // Example: 0.1 + 0.2 might be 0.30000000000000004 instead of 0.3
    // This check ensures we stop when we're "close enough" to the target
    if (Math.abs(totalCost - targetAmount) < 0.000001) break;
  }

  // Round to 2 decimal places to avoid floating point artifacts
  return Number(totalCredits.toFixed(2));
}
