import { ReactNode, useState } from 'react';
import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { EditableInput } from 'web-components/src/components/inputs/new/EditableInput/EditableInput';
import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';

import {
  OrderProps,
  OrderSummaryProps,
  PaymentMethod,
} from './OrderSummaryCard.types';

function OrderSummmaryRowHeader({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <h3
      className={`text-grey-400 text-[11px] font-extrabold font-['Lato'] uppercase tracking-[1px] ${className} m-0`}
    >
      {text}
    </h3>
  );
}

function OrderSummaryContent({
  order,
  currentBuyingStep,
  paymentMethod,
  onClickEditCard = () => {},
}: {
  order: OrderProps;
  currentBuyingStep: number;
  paymentMethod: PaymentMethod;
  onClickEditCard?: () => void;
}) {
  const { projectName, currency, pricePerCredit, credits } = order;
  const [creditsAmount, setCreditsAmount] = useState(credits);
  return (
    <div className="grid grid-cols-[75px_1fr] sm:grid-cols-[90px_1fr] max-w-full w-full pr-15 sm:px-[20px] pb-[30px] items-center sm:max-w-[330px]">
      <h5 className="col-span-2 text-base font-black font-['Muli'] mt-0 sm:mt-[30px] mb-5 sm:mb-[15px]">
        Order Summary
      </h5>
      <OrderSummmaryRowHeader text="project" className="self-start mt-5" />
      <p className="text-[14px] sm:text-base sm:font-normal font-['Lato'] self-start m-0">
        {projectName}
      </p>
      <OrderSummmaryRowHeader text="price per credit" />
      <div className="sm:grow shrink basis-0 justify-start items-center flex">
        <div className="font-['Lato'] text-[14px] sm:text-base mr-10">
          <SupCurrencyAndAmount
            price={pricePerCredit}
            currencyCode={currency}
          />
        </div>
        <DenomIconWithCurrency currency={currency} />
      </div>
      <OrderSummmaryRowHeader text="# credits" />
      <div className="text-base font-normal font-['Lato'] text-[14px] sm:text-base">
        <EditableInput
          value={creditsAmount}
          onChange={setCreditsAmount}
          ariaLabel="editable-credits"
          name="editable-credits"
        />
      </div>
      <div className="col-span-full">
        <hr className="border-t border-grey-300 border-solid border-l-0 border-r-0 border-b-0" />
      </div>
      <OrderSummmaryRowHeader text="total price" />
      <div className="flex items-center flex-wrap">
        <div className="justify-left font-bold font-['Lato'] items-start flex sm:text-[22px] mr-5 flex-grow">
          <SupCurrencyAndAmount
            price={pricePerCredit * creditsAmount}
            currencyCode={currency}
          />
        </div>
        <DenomIconWithCurrency currency={currency} />
      </div>
      {currentBuyingStep > 1 &&
        paymentMethod.type !== 'crypto' &&
        paymentMethod.cardNumber && (
          <>
            <OrderSummmaryRowHeader text="payment" className="" />
            <div className="flex items-center justify-between w-full">
              <p
                data-testid="payment-details"
                className="font-['Lato'] text-[14px] md:text-base m-0"
              >
                <span className="capitalize">{paymentMethod.type}</span>
                {` ending in ${paymentMethod.cardNumber.slice(-4)}`}
              </p>
              <EditButtonIcon
                onClick={onClickEditCard}
                className="self-end"
                ariaLabel="Change payment card"
              />
            </div>
          </>
        )}
    </div>
  );
}

function OrderSummaryImage({
  src,
  prefinanceProject,
}: {
  src: string;
  prefinanceProject?: boolean;
}) {
  return (
    <div className="w-[90px] sm:w-full  sm:h-[160px]">
      {prefinanceProject && <PrefinanceTag />}
      <img
        src={src}
        alt="order summary"
        className="w-[90px] h-[60px] px-15 sm:h-[160px] sm:px-0 sm:w-full object-cover object-center"
      />
    </div>
  );
}

function OrderSummary({ children }: { children: ReactNode }) {
  return (
    <div className="relative sm:w-full sm:max-w-[330px] h-[100%] rounded-[5px] border border-grey-300 border-solid bg-grey-0 shadow-none flex flex-2 sm:flex-col py-20 sm:py-0">
      {children}
    </div>
  );
}

export const OrderSummaryCard = (orderSummary: OrderSummaryProps) => {
  const { order, paymentMethod, currentBuyingStep, onClickEditCard } =
    orderSummary;
  return (
    <OrderSummary>
      <OrderSummaryImage
        src={order.image}
        prefinanceProject={order.prefinanceProject}
      />
      <OrderSummaryContent
        order={order}
        currentBuyingStep={currentBuyingStep}
        paymentMethod={paymentMethod}
        onClickEditCard={onClickEditCard}
      />
    </OrderSummary>
  );
};
