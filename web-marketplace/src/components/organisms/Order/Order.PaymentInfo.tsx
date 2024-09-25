import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { Title } from 'web-components/src/components/typography';

import { OrderDetailsIcon } from './Order.Icon';
import { OrderSummaryRow } from './Order.SummaryRow';
import { OrderSummarySectionProps, PaymentInfoData } from './Order.types';

export const OrderPaymentInfo = ({
  icon,
  title,
  data,
}: OrderSummarySectionProps) => {
  const { nameOnCard, denom, cardInfo } = data as PaymentInfoData;
  const isCardPayment = nameOnCard && cardInfo && denom === 'usd';
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
        {isCardPayment ? (
          <>
            <OrderSummaryRow title={_(msg`name on card`)} value={nameOnCard} />
            <OrderSummaryRow
              title={_(msg`card info`)}
              value={
                <p>
                  {_(msg`Visa ending in`)} {cardInfo}
                </p>
              }
              className="flex items-center"
            />
          </>
        ) : (
          <OrderSummaryRow
            title={_(msg`payment currency`)}
            value={<DenomIconWithCurrency currency={denom} />}
          />
        )}
      </div>
    </section>
  );
};
