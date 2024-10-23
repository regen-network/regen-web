import { i18n } from '@lingui/core';
import { msg, plural, Trans } from '@lingui/macro';
import { QueryAllowedDenomsResponse } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/query';
import { USD_DENOM } from 'config/allowedBaseDenoms';

import { TranslatorType } from 'lib/i18n/i18n.types';

import { UISellOrderInfo } from 'pages/Projects/AllProjects/AllProjects.types';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { KEPLR_LOGIN_REQUIRED } from 'components/organisms/BuyFiatModal/BuyFiatModal.constants';
import { BuyFiatModalContent } from 'components/organisms/BuyFiatModal/BuyFiatModal.types';
import { CardSellOrder } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.types';
import { SellOrderInfoExtented } from 'hooks/useQuerySellOrders';

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

export const getFiatModalContent = (
  currency: { askDenom: string; askBaseDenom: string } | undefined,
  isWeb2UserWithoutWallet: boolean,
  creditsInRequestedSellOrders: number,
  _: TranslatorType,
  allowedDenomsData: QueryAllowedDenomsResponse | undefined,
  data: BuyCreditsSchemaTypes,
  creditsInAllSellOrders: number | undefined,
): BuyFiatModalContent | undefined => {
  if (
    currency?.askDenom === USD_DENOM &&
    isWeb2UserWithoutWallet &&
    !creditsInRequestedSellOrders &&
    creditsInAllSellOrders
  ) {
    return {
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
    };
  } else if (!creditsInAllSellOrders) {
    // no credits available
    return {
      title: _(
        msg`Sorry, another user has purchased all of the available credits from this project`,
      ),
      content: (
        <p className="text-lg pb-10 text-center">
          <Trans>
            Because we use blockchain technology, if another user purchases the
            credits before you check out, you’ll need to choose different
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
    };
  } else if (creditsInRequestedSellOrders >= 0) {
    // some credits available
    return {
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
    };
  }
};

export const getSellOrdersCredits = (
  sellOrders: UISellOrderInfo[] | SellOrderInfoExtented[] | undefined,
) =>
  sellOrders?.reduce(
    (credits, sellOrder) => credits + Number(sellOrder.quantity),
    0,
  ) || 0;
