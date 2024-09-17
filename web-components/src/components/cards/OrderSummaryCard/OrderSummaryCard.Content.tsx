import { useState } from 'react';
import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { EditableInput } from 'web-components/src/components/inputs/new/EditableInput/EditableInput';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import { Title } from 'web-components/src/components/typography';

import { CRYPTO_TOOLTIP_TEXT } from './OrderSummaryCard.constants';
import { OrderProps, PaymentMethod } from './OrderSummaryCard.types';
import { OrderSummmaryRowHeader } from './OrderSummmaryCard.RowHeader';

type Props = {
  title: string;
  order: OrderProps;
  currentBuyingStep: number;
  paymentMethod: PaymentMethod;
  headers: {
    project: string;
    pricePerCredit: string;
    credits: string;
    totalPrice: string;
    payment: string;
  };
  ariaLabels: {
    editableCredits: string;
    changePaymentCard: string;
    editButtonAriaLabel: string;
  };
  editableUpdateButtonText: string;
  endingInText: string;
  onClickEditCard?: () => void;
};

export function OrderSummaryContent({
  title,
  order,
  currentBuyingStep,
  paymentMethod,
  headers,
  ariaLabels,
  editableUpdateButtonText,
  endingInText,
  onClickEditCard = () => {},
}: Props) {
  const { projectName, currency, pricePerCredit, credits } = order;
  const [creditsAmount, setCreditsAmount] = useState(credits);
  return (
    <div className="grid grid-cols-[75px_1fr] sm:grid-cols-[90px_1fr] max-w-full w-full pr-15 sm:px-[20px] pb-[30px] items-center sm:max-w-[330px]">
      <Title
        variant="h5"
        className="col-span-2 text-base mt-0 sm:mt-[30px] mb-5 sm:mb-[15px]"
      >
        {title}
      </Title>
      <OrderSummmaryRowHeader text="project" className="self-start mt-5" />
      <p className="text-[14px] sm:text-base sm:font-normal font-['Lato'] self-start m-0">
        {projectName}
      </p>
      <OrderSummmaryRowHeader text={headers.pricePerCredit} />
      <div className="justify-start items-center flex">
        <span>
          <SupCurrencyAndAmount
            price={pricePerCredit}
            currencyCode={currency}
          />
        </span>
        <DenomIconWithCurrency
          currency={currency}
          className="pt-[8px] ml-10 text-[14px] sm:text-base"
          tooltipText={`${
            currency !== CURRENCIES.usd ? CRYPTO_TOOLTIP_TEXT : ''
          }`}
        />
      </div>
      <OrderSummmaryRowHeader text={headers.credits} />
      <div className="text-base font-normal font-['Lato'] text-[14px] sm:text-base">
        <EditableInput
          value={creditsAmount}
          onChange={setCreditsAmount}
          inputAriaLabel={ariaLabels.editableCredits}
          editButtonAriaLabel={ariaLabels.editButtonAriaLabel}
          updateButtonText={editableUpdateButtonText}
          name="editable-credits"
        />
      </div>
      <div className="col-span-full">
        <hr className="border-t border-grey-300 border-solid border-l-0 border-r-0 border-b-0" />
      </div>
      <div className="flex items-end col-span-full gap-5">
        <OrderSummmaryRowHeader
          text={headers.totalPrice}
          className="pb-[9px]"
        />
        <div className="flex flex-wrap">
          <span className="pt-[11px] sm:pt-5">
            <SupCurrencyAndAmount
              price={pricePerCredit * creditsAmount}
              currencyCode={currency}
              className="font-bold font-['Lato'] sm:text-[22px] mr-10"
            />
          </span>
          <DenomIconWithCurrency
            currency={currency}
            className="pt-[12px] text-[14px] sm:text-base"
          />
        </div>
      </div>
      {currentBuyingStep > 1 &&
        paymentMethod.type !== 'crypto' &&
        paymentMethod.cardNumber && (
          <div className="flex items-end col-span-full gap-5">
            <OrderSummmaryRowHeader
              text="payment"
              className="items-end  pb-[4px] w-[125px]"
            />
            <div className="flex items-center justify-between w-full">
              <p
                data-testid="payment-details"
                className="font-['Lato'] text-[14px] md:text-base m-0"
              >
                <span className="capitalize">
                  {paymentMethod.type} {endingInText}
                </span>{' '}
                {paymentMethod.cardNumber.slice(-4)}
              </p>
              <EditButtonIcon
                onClick={onClickEditCard}
                className="self-end"
                ariaLabel={ariaLabels.changePaymentCard}
              />
            </div>
          </div>
        )}
    </div>
  );
}
