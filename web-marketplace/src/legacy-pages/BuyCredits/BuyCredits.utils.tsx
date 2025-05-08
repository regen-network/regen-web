import { UseFormSetValue } from 'react-hook-form';
import { i18n } from '@lingui/core';
import { msg, plural, Trans } from '@lingui/react';
import { AllowedDenom } from '@regen-network/api/regen/ecocredit/marketplace/v1/state';
import {
  AXELAR_USDC_DENOM,
  EEUR_DENOM,
  EVMOS_DENOM,
  GRAVITY_USDC_DENOM,
  REGEN_DENOM,
  USD_DENOM,
  USDC_DENOM,
} from 'config/allowedBaseDenoms';
import { UISellOrderInfo } from 'legacy-pages/Projects/AllProjects/AllProjects.types';
import { postData } from 'utils/fetch/postData';
import { IBC_DENOM_PREFIX } from 'utils/ibc/getDenomTrace';

import { getFormattedNumber } from 'web-components/src/utils/format';
import { truncate } from 'web-components/src/utils/truncate';

import { apiUri } from 'lib/apiUri';
import { getHashUrl } from 'lib/block-explorer';
import { TranslatorType } from 'lib/i18n/i18n.types';
import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { SellOrderInfoExtented } from 'lib/queries/react-query/ecocredit/marketplace/getSellOrdersExtendedQuery/getSellOrdersExtendedQuery.types';

import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';
import {
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
  MIN_USD_CURRENCY_AMOUNT,
  SELL_ORDERS,
} from 'components/molecules/CreditsAmount/CreditsAmount.constants';
import { Currency } from 'components/molecules/CreditsAmount/CreditsAmount.types';
import {
  getCreditsAmount,
  getCurrencyAmount,
} from 'components/molecules/CreditsAmount/CreditsAmount.utils';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { KEPLR_LOGIN_REQUIRED } from 'components/organisms/BuyWarningModal/BuyWarningModal.constants';
import { BuyWarningModalContent } from 'components/organisms/BuyWarningModal/BuyWarningModal.types';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';

import {
  AGREE_PURCHASE,
  AMOUNT_LABELS,
  BUY_CREDITS_FORM_PREFIX,
  CHOOSE_CREDITS,
  COMPLETE,
  CUSTOMER_INFO,
  PAYMENT_INFO,
  PAYMENT_OPTIONS,
  RETIREMENT,
} from './BuyCredits.constants';
import {
  BuyCreditsSchemaTypes,
  PaymentOptionsType,
  SendOrderConfirmationEmailParams,
} from './BuyCredits.types';

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
    ? cardSellOrders // already sorted in getCardSellOrders
    : filteredCryptoSellOrders?.sort(
        (a, b) => Number(a.askAmount) - Number(b.askAmount),
      ) || [];
};

export const getWarningModalContent = (
  currency: { askDenom: string; askBaseDenom: string } | undefined,
  creditsInRequestedSellOrders: number,
  _: TranslatorType,
  data: BuyCreditsSchemaTypes,
  creditsInAllSellOrders: number | undefined,
  allowedDenoms?: AllowedDenom[],
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
              the credits before you check out, you'll need to choose different
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
                allowedDenoms: allowedDenoms,
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
    formId: `${BUY_CREDITS_FORM_PREFIX}${projectId}`,
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
  let newSellOrders = sellOrders;

  if (
    newCurrencyAmount < MIN_USD_CURRENCY_AMOUNT &&
    paymentOption === PAYMENT_OPTIONS.CARD
  ) {
    const { currentCreditsAmount, sellOrders } = getCreditsAmount({
      value: MIN_USD_CURRENCY_AMOUNT,
      card: true,
      orderedSellOrders,
      creditTypePrecision,
    });
    newCreditsAmount = currentCreditsAmount;
    newCurrencyAmount = MIN_USD_CURRENCY_AMOUNT;
    newSellOrders = sellOrders;
  }

  setValue(CURRENCY_AMOUNT, newCurrencyAmount, {
    shouldValidate: true,
  });
  setValue(CREDITS_AMOUNT, newCreditsAmount, { shouldValidate: true });
  setValue(SELL_ORDERS, newSellOrders);

  updateMultiStepData(
    {
      ...data,
      creditsAmount: newCreditsAmount,
      currencyAmount: newCurrencyAmount,
      sellOrders: newSellOrders,
    },
    activeStep,
  );
}

export const getCryptoCurrencyIconSrc = (
  baseDenom: string,
  bankDenom: string,
) => {
  const ibcDenom = bankDenom?.includes(IBC_DENOM_PREFIX);

  let href = '';
  if (baseDenom === GRAVITY_USDC_DENOM)
    href =
      'https://regen-registry.s3.us-east-1.amazonaws.com/assets/icons/usdc.grv.png';
  // On mainnet, AXELAR_USDC_DENOM and USDC_DENOM base denoms have the same value: uusd
  // so we also use the bank denom to check whether it's USDC.axl (IBC) or native USDC
  if (baseDenom === AXELAR_USDC_DENOM && ibcDenom)
    href =
      'https://regen-registry.s3.us-east-1.amazonaws.com/assets/icons/usdc.axl.png';
  if (baseDenom === USDC_DENOM && !ibcDenom)
    href =
      'https://regen-registry.s3.us-east-1.amazonaws.com/assets/icons/uusdc.png';
  if (baseDenom === EEUR_DENOM)
    href =
      'https://regen-registry.s3.us-east-1.amazonaws.com/assets/icons/eeur.png';
  if (baseDenom === REGEN_DENOM)
    href =
      'https://regen-registry.s3.us-east-1.amazonaws.com/assets/icons/regen.png';
  if (baseDenom === EVMOS_DENOM)
    href =
      'https://regen-registry.s3.us-east-1.amazonaws.com/assets/icons/evmos.png';
  return href;
};

export const getAmountLabel = (retiring: boolean) => {
  return retiring
    ? i18n._(AMOUNT_LABELS.RETIRED)
    : i18n._(AMOUNT_LABELS.TRADABLE);
};

/**
 * Sends an order confirmation email after a successful CRYPTO credits purchase.
 *
 * For FIAT purchases, the email handling is managed on the back-end.
 *
 * @param props. See {@link SendOrderConfirmationEmailParams} for details.
 *
 * @returns {Promise<void>} A promise that resolves when the email is sent
 */
export async function sendPurchaseConfirmationEmail({
  currency,
  retiring,
  email,
  currencyAmount,
  displayDenom,
  projectName,
  creditsAmount,
  txHash,
  token,
  retryCsrfRequest,
  certificateHref,
}: SendOrderConfirmationEmailParams) {
  const currencyIconSrc = getCryptoCurrencyIconSrc(
    currency.askBaseDenom,
    currency.askDenom,
  );

  const amountLabel = getAmountLabel(retiring);

  await postData({
    url: `${apiUri}/marketplace/v1/confirm-crypto-order`,
    data: {
      email,
      currencyAmount,
      currencyIconSrc,
      displayDenom,
      projectName,
      amountLabel,
      creditsAmount,
      txHref: getHashUrl(txHash),
      txHash: truncate(txHash),
      orderHref: `${getBaseOrderUrl()}${txHash?.toLowerCase()}`,
      certificateHref,
    },
    token,
    retryCsrfRequest,
  });
}

export const getBaseCertificateUrl = (): string => {
  return `${window.location.origin}/certificate/`;
};

export const getCertificateHref = (
  retirementId: string,
  name: string | undefined,
) => {
  const baseUrl = getBaseCertificateUrl();
  const nameParam = name ? `?name=${encodeURIComponent(name)}` : '';
  return `${baseUrl}${retirementId}${nameParam}`;
};

export const getBaseOrderUrl = (): string => {
  return `${window.location.origin}/dashboard/admin/my-orders#`;
};
