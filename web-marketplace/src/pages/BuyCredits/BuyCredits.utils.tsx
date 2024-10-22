import { i18n } from '@lingui/core';
import { msg, plural } from '@lingui/macro';

import { getFormattedNumber } from 'web-components/src/utils/format';

import { PAYMENT_OPTIONS } from './BuyCredits.constants';
import { PaymentOptionsType } from './BuyCredits.types';

type GetFormModelParams = {
  paymentOption: PaymentOptionsType;
  retiring: boolean;
  projectId: string;
};
export const getFormModel = ({
  paymentOption,
  retiring,
  projectId,
}: GetFormModelParams) => {
  const nameStep1 = i18n._(msg`Choose credits`);
  const nameStep2 =
    paymentOption === PAYMENT_OPTIONS.CARD
      ? i18n._(msg`Payment info`)
      : i18n._(msg`Customer info`);
  const nameStep3 = retiring
    ? i18n._(msg`Retirement`)
    : i18n._(msg`Agree & purchase`);
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
      { id: 'complete', name: i18n._(msg`Complete`) },
    ],
  };
};

type GetCardItemsParams = {
  retiring: boolean;
  creditsAmount: number;
};
export const getCardItems = ({
  retiring,
  creditsAmount,
}: GetCardItemsParams) => [
  {
    label: i18n._(msg`total purchase price`),
    value: {
      name: formatNumber({
        num: creditCount * microToDenom(price),
        ...quantityFormatNumberOptions,
      }),
      icon: (
        <Box
          component="span"
          sx={{
            mr: '4px',
            display: 'inline-block',
            verticalAlign: 'bottom',
          }}
        >
          <DenomIcon baseDenom={baseDenom} sx={{ display: 'flex' }} />
        </Box>
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
