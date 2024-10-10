import { useEffect, useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { EditableInput } from 'web-components/src/components/inputs/new/EditableInput/EditableInput';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import { Title } from 'web-components/src/components/typography';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import {
  CardDetails,
  PaymentOptionsType,
} from 'pages/BuyCredits/BuyCredits.types';

import { DenomIconWithCurrency } from '../DenomIconWithCurrency/DenomIconWithCurrency';
import {
  AllowedDenoms,
  findDisplayDenom,
} from '../DenomLabel/DenomLabel.utils';
import { CRYPTO_TOOLTIP_TEXT } from './OrderSummaryCard.constants';
import { OrderProps } from './OrderSummaryCard.types';
import { OrderSummmaryRowHeader } from './OrderSummmaryCard.RowHeader';

type Props = {
  order: OrderProps;
  cardDetails?: CardDetails;
  onClickEditCard?: () => void;
  paymentOption: PaymentOptionsType;
  allowedDenoms: AllowedDenoms;
  setCreditsAmount: (creditsAmount: number) => void;
  creditsAvailable: number;
  onInvalidCredits?: () => void;
};

export function OrderSummaryContent({
  order,
  cardDetails,
  onClickEditCard = () => {},
  paymentOption,
  allowedDenoms,
  setCreditsAmount,
  creditsAvailable,
  onInvalidCredits,
}: Props) {
  const { _ } = useLingui();

  const { projectName, currency, pricePerCredit, credits } = order;

  const displayDenom = findDisplayDenom({
    allowedDenoms,
    bankDenom: currency.askDenom,
    baseDenom: currency.askBaseDenom,
  });

  return (
    <div className="grid grid-cols-[75px_1fr] sm:grid-cols-[90px_1fr] max-w-full w-full pr-15 sm:px-[20px] pb-[30px] items-center sm:max-w-[330px]">
      <Title
        variant="h5"
        className="col-span-2 text-base mt-0 sm:mt-[30px] mb-5 sm:mb-[15px]"
      >
        <Trans>Order Summary</Trans>
      </Title>
      <OrderSummmaryRowHeader
        text={_(msg`project`)}
        className="self-start mt-5"
      />
      <p className="text-[14px] sm:text-base sm:font-normal font-['Lato'] self-start m-0">
        {projectName}
      </p>
      <OrderSummmaryRowHeader text={_(msg`avg price per credit`)} />
      <div className="justify-start items-center flex flex-wrap">
        <span className="mr-10">
          <SupCurrencyAndAmount
            price={pricePerCredit || 0}
            currencyCode={currency.askDenom}
          />
        </span>
        <DenomIconWithCurrency
          baseDenom={currency.askBaseDenom}
          displayDenom={displayDenom}
          className="pt-[8px] text-[14px] sm:text-base"
          tooltipText={
            paymentOption !== PAYMENT_OPTIONS.CARD ? _(CRYPTO_TOOLTIP_TEXT) : ''
          }
        />
      </div>
      <OrderSummmaryRowHeader text={_(msg`# credits`)} className="pt-5" />
      <div className="text-base font-normal font-['Lato'] text-[14px] sm:text-base">
        <EditableInput
          value={credits}
          maxValue={creditsAvailable}
          onChange={setCreditsAmount}
          inputAriaLabel={_(msg`Editable credits`)}
          editButtonAriaLabel={_(msg`Edit`)}
          updateButtonText={_(msg`update`)}
          name="editable-credits"
          onInvalidValue={onInvalidCredits}
        />
      </div>
      <div className="col-span-full">
        <hr className="border-t border-grey-300 border-solid border-l-0 border-r-0 border-b-0" />
      </div>
      <div className="flex items-end col-span-full gap-5">
        <OrderSummmaryRowHeader
          text={_(msg`total price`)}
          className="pb-[9px]"
        />
        <div className="flex flex-wrap">
          <span className="pt-[11px] sm:pt-5">
            <SupCurrencyAndAmount
              price={order.currencyAmount}
              currencyCode={currency.askDenom}
              className="font-bold font-['Lato'] sm:text-[22px] mr-10"
            />
          </span>
          <DenomIconWithCurrency
            baseDenom={currency.askBaseDenom}
            displayDenom={displayDenom}
            className="pt-[12px] text-[14px] sm:text-base"
          />
        </div>
      </div>
      {cardDetails && (
        <div className="flex items-end col-span-full gap-5">
          <OrderSummmaryRowHeader
            text={_(msg`payment`)}
            className="items-end  pb-[4px] w-[125px]"
          />
          <div className="flex items-center justify-between w-full">
            <p
              data-testid="payment-details"
              className="font-['Lato'] text-[14px] md:text-base m-0"
            >
              <Trans>
                <span className="capitalize">{cardDetails.brand}</span> ending
                in {cardDetails.last4}
              </Trans>
            </p>
            <EditButtonIcon
              onClick={onClickEditCard}
              className="self-end"
              ariaLabel={_(msg`Change payment card`)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
