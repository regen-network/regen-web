import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import { Title } from 'web-components/src/components/typography';

import { OrderDetailsIcon } from './Order.Icon';
import { OrderSummaryRow } from './Order.SummaryRow';
import { CreditsData, OrderSummarySectionProps } from './Order.types';

export const OrderCredits = ({
  icon,
  title,
  data,
}: OrderSummarySectionProps) => {
  const { _ } = useLingui();
  const { credits, price, denom } = data as CreditsData;
  const totalPrice = +credits * +price;
  return (
    <section className="flex gap-20">
      <OrderDetailsIcon icon={icon} />
      <div className="w-full">
        <Title
          variant="h5"
          className="text-sm text-grey-600 uppercase font-extrabold font-['muli'] mb-15 tracking-[1px]"
        >
          {title}
        </Title>
        <OrderSummaryRow
          title={_(msg`Price per credit`)}
          value={
            <div className="flex items-center">
              <SupCurrencyAndAmount
                price={+price}
                currencyCode={denom}
                className="mr-10"
              />
              <DenomIconWithCurrency currency={denom} />
            </div>
          }
        />
        <OrderSummaryRow title={_(msg`# credits`)} value={credits} />
        <hr className="w-full inline-block border-solid border-0 border-b-[1px] border-grey-300" />
        <OrderSummaryRow
          title={_(msg`total price`)}
          value={
            <div className="flex items-center">
              <SupCurrencyAndAmount
                price={totalPrice}
                currencyCode={denom}
                className="mr-10 text-lg pb-5"
              />
              <DenomIconWithCurrency currency={denom} />
            </div>
          }
          className="flex items-baseline"
        />
      </div>
    </section>
  );
};
