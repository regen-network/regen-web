import { cn } from 'web-components/src/utils/styles/cn';
import { DenomIcon } from 'web-marketplace/src/components/molecules/DenomIcon/DenomIcon';

import QuestionMarkTooltip from '../tooltip/QuestionMarkTooltip';
import { Body } from '../typography';
import { Currency } from './DenomIconWithCurrency.constants';

export function DenomIconWithCurrency({
  currency,
  className,
  tooltipText,
}: {
  currency: Currency;
  className?: string;
  tooltipText?: string;
}) {
  return (
    <Body size="sm" className={cn('flex gap-5', className)}>
      <DenomIcon
        baseDenom={currency}
        className="h-[24px] inline-block denom-icon"
      />
      <span className="pb-5 pt-3 text-sm">{currency.toUpperCase()}</span>
      {tooltipText && (
        <QuestionMarkTooltip
          placement="bottom"
          title={tooltipText}
          className="mt-[4px]"
        />
      )}
    </Body>
  );
}
