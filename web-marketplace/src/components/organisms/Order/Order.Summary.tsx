import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';

import { Link } from 'components/atoms';

import { OrderSummarySection } from './Order.Summary.Section';
import { OrderSummaryRow } from './Order.SummaryRow';
import {
  BlockchainDetailsData,
  CreditsData,
  OrderSummarySectionProps,
  PaymentInfoData,
  RetirementInfoData,
} from './Order.types';

interface OrderSummaryProps {
  retirementInfo: OrderSummarySectionProps;
  blockchainDetails: OrderSummarySectionProps;
  creditsData: OrderSummarySectionProps;
  paymentInfo: OrderSummarySectionProps;
}

export const OrderSummary = ({
  creditsData,
  retirementInfo,
  blockchainDetails,
  paymentInfo,
}: OrderSummaryProps) => {
  const { _ } = useLingui();
  const { purchaseDate, blockchainRecord } =
    blockchainDetails.data as BlockchainDetailsData;
  const { nameOnCard, askDenom, cardLast4 } =
    paymentInfo.data as PaymentInfoData;
  const isCardPayment = nameOnCard && cardLast4 && askDenom === 'usd';
  const isTradable =
    (retirementInfo.data as RetirementInfoData).tradableCredits !== null;
  const { reason, location, tradableCredits } =
    retirementInfo.data as RetirementInfoData;
  const {
    credits,
    price,
    askDenom: creditAskDenom,
  } = creditsData.data as CreditsData;
  console.log(
    '🚀 ~ file: Order.Summary.tsx:48 ~ creditAskDenom:',
    creditAskDenom,
  );
  const totalPrice = +credits * +price;

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-30">
      <OrderSummarySection icon={creditsData.icon} title={creditsData.title}>
        <OrderSummaryRow
          title={_(msg`Price per credit`)}
          value={
            <div className="flex items-center">
              <SupCurrencyAndAmount
                price={+price}
                currencyCode={creditAskDenom}
                className="mr-10 text-base"
              />
              <DenomIconWithCurrency
                currency={creditAskDenom}
                className="mt-5"
              />
            </div>
          }
        />
        <OrderSummaryRow
          title={_(msg`# credits`)}
          titleClassName="mt-[6px]"
          value={<span className="text-base">{credits}</span>}
        />
        <hr className="w-full inline-block border-solid border-0 border-b-[1px] border-grey-300 mb-10" />
        <OrderSummaryRow
          title={_(msg`total price`)}
          value={
            <div className="flex items-center">
              <SupCurrencyAndAmount
                price={totalPrice}
                currencyCode={askDenom}
                className="mr-10 text-lg pb-5"
              />
              <DenomIconWithCurrency
                currency={askDenom}
                className={`${askDenom === 'usd' ? 'mt-[7px]' : 'mt-[2px]'}`}
              />
            </div>
          }
          className="items-baseline"
        />
      </OrderSummarySection>
      <OrderSummarySection
        icon={retirementInfo.icon}
        title={retirementInfo.title}
      >
        {isTradable ? (
          <OrderSummaryRow
            title={_(msg`Tradable Credits`)}
            value={<span className="italic">{tradableCredits}</span>}
            clampDescription={false}
          />
        ) : (
          <>
            <OrderSummaryRow title={_(msg`Retirement reason`)} value={reason} />
            <OrderSummaryRow
              title={_(msg`Retirement location`)}
              value={location}
            />
            {/* <OrderSummaryRow
              title="Make anonymous"
              value={
                <MakeAnonymous
                  value={data.makeAnonymous ? 'Yes' : 'No'}
                  onChange={() => []}
                  ariaLabel="anonymous-select"
                  name="anonymous-select"
                />
              }
            /> */}
          </>
        )}
      </OrderSummarySection>
      <OrderSummarySection icon={paymentInfo.icon} title={paymentInfo.title}>
        {isCardPayment ? (
          <>
            <OrderSummaryRow title={_(msg`name on card`)} value={nameOnCard} />
            <OrderSummaryRow
              title={_(msg`card info`)}
              value={
                <span>
                  {_(msg`Visa ending in`)} {cardLast4}
                </span>
              }
              className="items-center"
            />
          </>
        ) : (
          <OrderSummaryRow
            title={_(msg`payment currency`)}
            value={<DenomIconWithCurrency currency={askDenom} />}
          />
        )}
      </OrderSummarySection>
      <OrderSummarySection
        icon={blockchainDetails.icon}
        title={blockchainDetails.title}
      >
        <OrderSummaryRow title={_(msg`purchase date`)} value={purchaseDate} />
        {blockchainRecord && (
          <OrderSummaryRow
            title={
              <div className="relative">
                <span className="inline">
                  <Trans>blockchain record</Trans>
                </span>
                <QuestionMarkTooltip
                  className="absolute bottom-0 right-20"
                  title={_(
                    msg`A unique identifier that tracks and verifies a specific transaction on the blockchain.`,
                  )}
                />
              </div>
            }
            value={
              <Link
                href="https://google.com"
                className="text-grey-700 !underline inline-block text-ellipsis w-[100px] overflow-hidden"
              >
                {blockchainRecord}
              </Link>
            }
            clampDescription={false}
          />
        )}
      </OrderSummarySection>
    </main>
  );
};
