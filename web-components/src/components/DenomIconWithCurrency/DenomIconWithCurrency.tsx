import { DenomIcon } from 'web-marketplace/src/components/molecules/DenomIcon/DenomIcon';

import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
import { Body } from '../typography';
import { Currency } from './DenomIconWithCurrency.constants';

export function DenomIconWithCurrency({
  currency,
  tooltipText,
}: {
  currency: Currency;
  tooltipText?: string;
}) {
  return (
    <Body size="sm" className="flex gap-5 items-center">
      <DenomIcon baseDenom={currency} className="h-[24px] inline-block" />
      <span>{currency.toUpperCase()}</span>
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
