import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';

// import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { BlockchainIcon } from 'web-components/src/components/icons/BlockchainIcon';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';

import { Link } from 'components/atoms';
import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';
import { allowedDenoms } from 'components/organisms/Order/Order.mock';

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
}

export const OrderSummary = ({
  creditsData,
  retirementInfo,
  blockchainDetails,
  paymentInfo,
}: OrderSummaryProps) => {
  const { _ } = useLingui();
  const { purchaseDate, blockchainRecord } = blockchainDetails;
  const { nameOnCard, askDenom, askBaseDenom, cardLast4, cardBrand } =
    paymentInfo;
  const isCardPayment = nameOnCard && cardLast4 && askDenom === USD_DENOM;
  const isTradable = retirementInfo.tradableCredits !== null;
  const { reason, location, tradableCredits } = retirementInfo;
  const {
    credits,
    price,
    askDenom: creditAskDenom,
    askBaseDenom: creditAskBaseDenom,
  } = creditsData;

  const totalPrice = +credits * +price;

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-30">
      <OrderSummarySection
        icon={<CreditsIcon fontSize="medium" className="text-grey-500" />}
        title={_(msg`Credits`)}
      >
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
                baseDenom={creditAskBaseDenom}
                displayDenom={findDisplayDenom({
                  allowedDenoms,
                  bankDenom: creditAskDenom,
                  baseDenom: creditAskBaseDenom,
                })}
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
                baseDenom={askBaseDenom}
                displayDenom={findDisplayDenom({
                  allowedDenoms,
                  bankDenom: askDenom,
                  baseDenom: askBaseDenom,
                })}
                className={`${
                  askDenom === USD_DENOM ? 'mt-[7px]' : 'mt-[2px]'
                }`}
              />
            </div>
          }
          className="items-baseline"
        />
      </OrderSummarySection>
      <OrderSummarySection
        icon={<CertifiedDocumentIcon className="text-grey-500" />}
        title={_(msg`Retirement Info`)}
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
      <OrderSummarySection
        icon={<PaymentInfoIcon className="text-grey-500" />}
        title={_(msg`payment info`)}
      >
        {isCardPayment ? (
          <>
            <OrderSummaryRow title={_(msg`name on card`)} value={nameOnCard} />
            <OrderSummaryRow
              title={_(msg`card info`)}
              value={
                <span>
                  {cardBrand} {_(msg`ending in`)} {cardLast4}
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
                displayDenom={findDisplayDenom({
                  allowedDenoms,
                  bankDenom: askDenom,
                  baseDenom: askBaseDenom,
                })}
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
