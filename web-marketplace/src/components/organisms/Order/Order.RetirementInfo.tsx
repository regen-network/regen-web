import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Title } from 'web-components/src/components/typography';

import { OrderDetailsIcon } from './Order.Icon';
import { OrderSummaryRow } from './Order.SummaryRow';
import { OrderSummarySectionProps, RetirementInfoData } from './Order.types';

export const OrderRetirementInfo = ({
  icon,
  title,
  data,
}: OrderSummarySectionProps) => {
  const isTradable = (data as RetirementInfoData).tradableCredits !== null;
  const { reason, location, tradableCredits } = data as RetirementInfoData;
  const { _ } = useLingui();

  return (
    <section className="flex gap-20">
      <OrderDetailsIcon icon={icon} />
      <div>
        <Title
          variant="h5"
          className="text-xs text-grey-600 uppercase font-extrabold mb-15 tracking-[1px]"
        >
          {title}
        </Title>
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
      </div>
    </section>
  );
};
