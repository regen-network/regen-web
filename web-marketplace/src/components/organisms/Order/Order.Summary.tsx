import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';

import { BlockchainIcon } from 'web-components/src/components/icons/BlockchainIcon';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';
import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';

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
  creditsData: CreditsData;
  paymentInfo: PaymentInfoData;
  displayTotalPrice: number;
  displayDenom: string;
  currency: {
    askDenom: string;
    askBaseDenom: string;
  };
}

export const OrderSummary = ({
  creditsData,
  retirementInfo,
  blockchainDetails,
  paymentInfo,
  displayTotalPrice,
  displayDenom,
  currency,
}: OrderSummaryProps) => {
  const { _ } = useLingui();
  const { purchaseDate, blockchainRecord } = blockchainDetails;
  const { askDenom, askBaseDenom, cardLast4, cardBrand } = paymentInfo;
  const isCardPayment = cardLast4 && askDenom === USD_DENOM;
  const { reason, location, retiredCredits } = retirementInfo;
  const { credits } = creditsData;

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
              amount={+displayTotalPrice / +credits}
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
                href={`${
                  import.meta.env.VITE_BLOCK_EXPLORER
                }/txs/${blockchainRecord}`}
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
