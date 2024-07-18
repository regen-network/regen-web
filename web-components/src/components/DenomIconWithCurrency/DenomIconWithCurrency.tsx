import { DenomIcon } from 'web-marketplace/src/components/molecules/DenomIcon/DenomIcon';

import InfoTooltipWithIcon from '../tooltip/InfoTooltipWithIcon';
import { Currency } from './DenomIconWithCurrency.constants';

export function DenomIconWithCurrency({
  currency,
  tooltipText,
}: {
  currency: Currency;
  tooltipText?: string;
}) {
  return (
    <span className="text-grey-600 text-sm font-normal font-['Lato'] flex gap-[5px] items-center">
      <DenomIcon baseDenom={currency} className="h-[24px] block" />
      <span>{currency.toUpperCase()}</span>
      {tooltipText && (
        <InfoTooltipWithIcon
          placement="bottom"
          outlined
          title={tooltipText}
          className="fill-current text-grey-600 fill-grey-600"
        />
      )}
    </span>
  );
}
