import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import QuestionMarkTooltip from 'web-components/src/components/tooltip/QuestionMarkTooltip';
import { Title } from 'web-components/src/components/typography';

import { Link } from 'components/atoms/Link';

import { OrderDetailsIcon } from './Order.Icon';
import { OrderSummaryRow } from './Order.SummaryRow';
import { BlockchainDetailsData, OrderSummarySectionProps } from './Order.types';

export const OrderBlockchainDetails = ({
  icon,
  title,
  data,
}: OrderSummarySectionProps) => {
  const { purchaseDate, blockchainRecord } = data as BlockchainDetailsData;
  const { _ } = useLingui();
  return (
    <section className="flex gap-20">
      <OrderDetailsIcon icon={icon} />
      <div className="">
        <Title
          variant="h5"
          className="text-sm text-grey-600 uppercase font-extrabold font-['muli'] mb-15 tracking-[1px]"
        >
          {title}
        </Title>
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
      </div>
    </section>
  );
};
