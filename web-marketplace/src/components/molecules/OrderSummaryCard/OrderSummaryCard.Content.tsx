import { useCallback, useMemo, useState } from 'react';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { EditableInput } from 'web-components/src/components/inputs/new/EditableInput/EditableInput';
import { Title } from 'web-components/src/components/typography';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import {
  CardDetails,
  PaymentOptionsType,
} from 'pages/BuyCredits/BuyCredits.types';
import { NOT_ENOUGH_BALANCE } from 'components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';

import { AmountWithCurrency } from '../AmountWithCurrency/AmountWithCurrency';
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
  userBalance: number;
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
  userBalance,
}: Props) {
  const { _ } = useLingui();

  const { projectName, currency, pricePerCredit, credits, currencyAmount } =
    order;

  const displayDenom = useMemo(
    () =>
      findDisplayDenom({
        allowedDenoms,
        bankDenom: currency.askDenom,
        baseDenom: currency.askBaseDenom,
      }),
    [allowedDenoms, currency.askBaseDenom, currency.askDenom],
  );

  const [hasError, setHasError] = useState(false);

  const handleOnKeyDown = useCallback(
    (credits: number) => {
      setHasError(
        credits * pricePerCredit > 10 && paymentOption !== PAYMENT_OPTIONS.CARD,
      );
    },
    [paymentOption, pricePerCredit],
  );

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
      <p className="text-[14px] sm:text-base sm:font-normal font-sans self-start m-0">
        {projectName}
      </p>
      <OrderSummmaryRowHeader text={_(msg`avg price per credit`)} />
      <AmountWithCurrency
        amount={pricePerCredit || 0}
        currency={currency}
        displayDenom={displayDenom}
        classes={{
          root: 'justify-start',
          denom: 'pt-[8px] text-[14px] sm:text-base',
        }}
        tooltipText={
          paymentOption !== PAYMENT_OPTIONS.CARD ? _(CRYPTO_TOOLTIP_TEXT) : ''
        }
      />
      <OrderSummmaryRowHeader text={_(msg`# credits`)} className="pt-5" />
      <div className="text-base font-normal font-sans text-[14px] sm:text-base">
        <EditableInput
          value={credits}
          maxValue={creditsAvailable}
          onChange={setCreditsAmount}
          onKeyDown={handleOnKeyDown}
          inputAriaLabel={_(msg`Editable credits`)}
          editButtonAriaLabel={_(msg`Edit`)}
          updateButtonText={_(msg`update`)}
          name="editable-credits"
          onInvalidValue={onInvalidCredits}
          hasError={hasError}
        />
        {hasError && (
          <div className="pt-5 text-error-300 text-sm w-full">
            {`${_(NOT_ENOUGH_BALANCE)} ${displayDenom}`}
          </div>
        )}
      </div>
      <div className="col-span-full pt-10">
        <hr className="border-t border-grey-300 border-solid border-l-0 border-r-0 border-b-0" />
      </div>
      <div className="flex items-end col-span-full gap-5">
        <OrderSummmaryRowHeader
          text={_(msg`total price`)}
          className="pb-[9px]"
        />
        <AmountWithCurrency
          amount={order.currencyAmount}
          currency={currency}
          displayDenom={displayDenom}
          classes={{
            amountContainer: 'pt-[11px] sm:pt-5',
            amount: 'font-bold font-sans sm:text-[22px]',
            denom: 'pt-[12px] text-[14px] sm:text-base',
          }}
        />
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
              className="font-sans text-[14px] md:text-base m-0"
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
