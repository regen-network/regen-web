import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';

import { BlockchainIcon } from 'web-components/src/components/icons/BlockchainIcon';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';
import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';

import { getHashUrl } from 'lib/block-explorer';

import { Link } from 'components/atoms';
import { AmountWithCurrency } from 'components/molecules/AmountWithCurrency/AmountWithCurrency';
import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';

import { OrderSummarySection } from './Order.Summary.Section';
import { OrderSummaryRow } from './Order.SummaryRow';
import {
  BlockchainDetailsData,
  CreditsData,
  PaymentInfoData,
  RetirementInfoData,
} from './Order.types';

interface OrderSummaryProps {
  retirementInfo: RetirementInfoData;
  blockchainDetails: BlockchainDetailsData;
  credits: CreditsData['credits'];
  paymentInfo: PaymentInfoData;
  displayTotalPrice: number;
  displayDenom: string;
  currency: {
    askDenom: string;
    askBaseDenom: string;
  };
  pricePerCredits: number;
}

export const OrderSummary = ({
  credits,
  retirementInfo,
  blockchainDetails,
  paymentInfo,
  displayTotalPrice,
  displayDenom,
  currency,
  pricePerCredits,
}: OrderSummaryProps) => {
  const { _ } = useLingui();
  const { purchaseDate, blockchainRecord } = blockchainDetails;
  const { askDenom, askBaseDenom, cardLast4, cardBrand } = paymentInfo;
  const isCardPayment = cardLast4 && askDenom === USD_DENOM;
  const { reason, location, retiredCredits } = retirementInfo;

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-30">
      <OrderSummarySection
        icon={<CreditsIcon fontSize="medium" className="text-grey-500" />}
        title={_(msg`Credits`)}
      >
        <OrderSummaryRow
          title={_(msg`Price per credit`)}
          value={
            <AmountWithCurrency
              amount={pricePerCredits}
              currency={currency}
              displayDenom={displayDenom}
              classes={{
                amount: 'text-base',
                denom: 'mt-5',
              }}
            />
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
            <AmountWithCurrency
              amount={displayTotalPrice}
              currency={currency}
              displayDenom={displayDenom}
              classes={{
                amount: 'text-lg pb-5',
                denom: `${askDenom === USD_DENOM ? 'mt-[7px]' : 'mt-[2px]'}`,
              }}
            />
          }
          className="items-baseline"
        />
      </OrderSummarySection>
      <OrderSummarySection
        icon={<CertifiedDocumentIcon className="text-grey-500" />}
        title={_(msg`Retirement Info`)}
      >
        {!retiredCredits ? (
          <OrderSummaryRow
            title={_(msg`Tradable Credits`)}
            value={
              <span className="italic">
                {_(
                  msg`Credits were purchased in a tradable format and were not retired`,
                )}
              </span>
            }
            clampDescription={false}
          />
        ) : (
          <>
            {reason && (
              <OrderSummaryRow
                title={_(msg`Retirement reason`)}
                value={reason}
              />
            )}
            {location && (
              <OrderSummaryRow
                title={_(msg`Retirement location`)}
                value={location}
              />
            )}
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
      <OrderSummarySection
        icon={<PaymentInfoIcon className="text-grey-500" />}
        title={_(msg`payment info`)}
      >
        {isCardPayment ? (
          <>
            <OrderSummaryRow
              title={_(msg`card info`)}
              value={
                <span>
                  <span className="capitalize">{cardBrand}</span>{' '}
                  {_(msg`ending in`)} {cardLast4}
                </span>
              }
              className="items-center"
            />
          </>
        ) : (
          <OrderSummaryRow
            title={_(msg`payment currency`)}
            value={
              <DenomIconWithCurrency
                baseDenom={askBaseDenom}
                bankDenom={askDenom}
                displayDenom={displayDenom}
              />
            }
          />
        )}
      </OrderSummarySection>
      <OrderSummarySection
        icon={<BlockchainIcon className="text-grey-500" />}
        title={_(msg`Blockchain Details`)}
      >
        <OrderSummaryRow title={_(msg`purchase date`)} value={purchaseDate} />
        {blockchainRecord && (
          <OrderSummaryRow
            title={
              <div className="flex">
                <span className="inline max-w-[85px]">
                  <Trans>blockchain record</Trans>
                </span>
                <QuestionMarkTooltip
                  size="lg"
                  className="pl-1 pb-1 w-[24px] h-[24px] flex justify-center items-center"
                  title={_(
                    msg`A unique identifier that tracks and verifies a specific transaction on the blockchain.`,
                  )}
                />
              </div>
            }
            value={
              <Link
                href={getHashUrl(blockchainRecord)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-700 inline-block text-ellipsis w-[100px] overflow-hidden border-0 border-b-[1px] border-solid leading-5"
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
