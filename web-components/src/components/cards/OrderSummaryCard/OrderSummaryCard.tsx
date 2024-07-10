import { ReactNode } from 'react';
import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { CurrencyFlag } from 'web-components/src/components/CurrencyFlag/CurrencyFlag';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';

import {
  OrderProps,
  OrderSummaryProps,
  PaymentMethod,
} from './OrderSummaryCard.types';
import { formatPrice } from './OrderSummaryCard.utils';

function OrderSummmaryRowHeader({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h3
      className={`w-[75px] sm:w-[90px] text-grey-400 text-[10px] sm:text-[11px] font-extrabold font-['Lato'] uppercase tracking-[1px] ${className}`}
    >
      {text}
    </h3>
  );
}

function OrderSummmaryRow({ children }: { children: ReactNode }) {
  return <div className="items-baseline gap-[5px] flex w-full">{children}</div>;
}

function OrderSummaryContent({
  order,
  currentBuyingStep,
  paymentMethod,
}: {
  order: OrderProps;
  currentBuyingStep: number;
  paymentMethod: PaymentMethod;
}) {
  const { projectName, currency, pricePerCredit, credits } = order;
  return (
    <div className="sm:w-full sm:max-w-[330px] sm:px-[20px] pb-[30px] flex-col justify-center items-start sm:inline-flex">
      <h5 className="text-base font-black font-['Muli'] mt-0 sm:mt-[30px] mb-5 sm:mb-[15px]">
        Order Summary
      </h5>
      <div className="flex-col justify-center items-start gap-[5px] flex">
        <OrderSummmaryRow>
          <OrderSummmaryRowHeader text="project" />
          <p className="[@media(min-width:360px)]:grow shrink basis-0 text-[14px] sm:text-base sm:font-normal font-['Lato']">
            {projectName}
          </p>
        </OrderSummmaryRow>
        <OrderSummmaryRow>
          <OrderSummmaryRowHeader text="price per credit" />
          <div className="sm:grow shrink basis-0 justify-start items-center flex">
            <div className="justify-center font-['Lato'] items-start flex text-[14px] sm:text-base mr-10">
              <SupCurrencyAndAmount
                currency={currency}
                amount={formatPrice(pricePerCredit)}
              />
            </div>
            <CurrencyFlag currency={currency} />
          </div>
        </OrderSummmaryRow>
        <OrderSummmaryRow>
          <OrderSummmaryRowHeader text="# credits" />
          <div className="grow shrink basis-0 justify-between items-center flex">
            <div className="sm:grow shrink basis-0 text-base font-normal font-['Lato'] text-[14px] sm:text-base">
              {credits}
            </div>
            {/* TO-DO implement edit button onClick */}
            <EditButtonIcon
              onClick={() => {}}
              ariaLabel="Edit credits quantity"
            />
          </div>
        </OrderSummmaryRow>
        <div className="border-t border-grey-300 border-solid border-l-0 border-r-0 border-b-0 pt-[20px] mt-[15px] justify-start items-center gap-[5px] flex w-full">
          <OrderSummmaryRowHeader text="total price" />
          <div className="sm:grow shrink basis-0 justify-start items-center flex gap-[10px] [@media(max-width:340px)]:flex-col">
            <div className="justify-center font-bold font-['Lato'] items-start flex sm:text-[22px]">
              <SupCurrencyAndAmount
                currency={currency}
                amount={formatPrice(pricePerCredit * credits)}
              />
            </div>
            <CurrencyFlag currency={currency} />
          </div>
        </div>
        {currentBuyingStep > 1 &&
          paymentMethod.type &&
          paymentMethod.cardNumber && (
            <OrderSummmaryRow>
              <OrderSummmaryRowHeader text="payment" className="self-end" />
              <p
                data-testid="payment-details"
                className="grow shrink basis-0 font-['Lato'] text-[14px] sm:text-base self-end"
              >
                <span className="capitalize">{paymentMethod.type}</span>
                {` ending in ${paymentMethod.cardNumber.slice(-4)}`}
              </p>
              {/* TO-DO implement edit button onClick */}
              <EditButtonIcon
                onClick={() => {}}
                className="self-end"
                ariaLabel="Change payment card"
              />
            </OrderSummmaryRow>
          )}
      </div>
    </div>
  );
}

function OrderSummaryImage({ src }: { src: string }) {
  return (
    <div className="w-[90px] sm:w-full  sm:h-[160px]">
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
    <div className="sm:w-full sm:max-w-[330px] h-[100%] rounded-[5px] border border-grey-300 border-solid bg-white shadow-none flex flex-2 sm:flex-col py-20 sm:py-0">
      {children}
    </div>
  );
}

export const OrderSummaryCard = (orderSummary: OrderSummaryProps) => {
  const { order, paymentMethod, currentBuyingStep } = orderSummary;
  return (
    <OrderSummary>
      <OrderSummaryImage src={order.image} />
      <OrderSummaryContent
        order={order}
        currentBuyingStep={currentBuyingStep}
        paymentMethod={paymentMethod}
      />
    </OrderSummary>
  );
};
