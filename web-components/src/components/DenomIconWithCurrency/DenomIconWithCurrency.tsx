import { cn } from 'web-components/src/utils/styles/cn';
import { DenomIcon } from 'web-marketplace/src/components/molecules/DenomIcon/DenomIcon';

import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
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
      <DenomIcon baseDenom={currency} className="h-[24px] inline-block" />
      <span className="pb-5">{currency.toUpperCase()}</span>
      {tooltipText && (
        <InfoTooltipWithIcon
          placement="bottom"
          outlined
          title={tooltipText}
          className="fill-current text-grey-600 fill-grey-600"
        />
      )}
    </Body>
  );
}
