import { i18n } from '@lingui/core';
import { msg, plural, Trans } from '@lingui/macro';
// import { Box } from '@mui/material';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { USD_DENOM } from 'config/allowedBaseDenoms';

// import { quantityFormatNumberOptions } from 'config/decimals';
import {
  // formatNumber,
  getFormattedNumber,
} from 'web-components/src/utils/format';

// import { microToDenom } from 'lib/denom.utils';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { KEPLR_LOGIN_REQUIRED } from 'components/organisms/BuyWarningModal/BuyWarningModal.constants';
import { BuyWarningModalContent } from 'components/organisms/BuyWarningModal/BuyWarningModal.types';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { HandleSaveType } from 'components/templates/MultiStepTemplate/MultiStep.context';
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
  isWeb2UserWithoutWallet: boolean,
  creditsInRequestedSellOrders: number,
  _: TranslatorType,
  allowedDenomsData: QueryAllowedDenomsResponse | undefined,
  data: BuyCreditsSchemaTypes,
  creditsInAllSellOrders: number | undefined,
  isVisitingUser: boolean,
): BuyWarningModalContent | undefined => {
  if (
    currency?.askDenom === USD_DENOM &&
    (isWeb2UserWithoutWallet || isVisitingUser) &&
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
  projectId: string,
) => {
  return (
    sellOrders
      ?.filter(sellOrder => sellOrder?.batchDenom?.startsWith(projectId))
      .reduce(
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
