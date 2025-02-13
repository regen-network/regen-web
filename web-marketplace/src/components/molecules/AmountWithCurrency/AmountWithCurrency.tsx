import { SupCurrencyAndAmount } from 'web-components/src/components/SupCurrencyAndAmount/SupCurrencyAndAmount';
import { cn } from 'web-components/src/utils/styles/cn';

import { Currency } from '../CreditsAmount/CreditsAmount.types';
import { DenomIconWithCurrency } from '../DenomIconWithCurrency/DenomIconWithCurrency';

type Props = {
  amount: number;
  currency: Currency;
  displayDenom: string;
  classes?: {
    root?: string;
    amountContainer?: string;
    amount?: string;
    denom?: string;
  };
  tooltipText?: string;
};
export const AmountWithCurrency = ({
  amount,
  currency,
  displayDenom,
  classes,
  tooltipText,
}: Props) => (
  <div className={cn(classes?.root, 'flex flex-wrap items-center')}>
    <span className={cn(classes?.amountContainer, 'mr-10')}>
      <SupCurrencyAndAmount
        price={amount}
        currencyCode={currency?.askDenom}
        className={classes?.amount}
      />
    </span>
    <DenomIconWithCurrency
      baseDenom={currency?.askBaseDenom}
      bankDenom={currency?.askDenom}
      displayDenom={displayDenom}
      className={classes?.denom}
      tooltipText={tooltipText}
    />
  </div>
);
