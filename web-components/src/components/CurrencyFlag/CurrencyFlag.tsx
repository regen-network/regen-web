import { CurrencyCode } from 'web-components/src/utils/currency';
import { DenomIcon } from 'web-marketplace/src/components/molecules/DenomIcon/DenomIcon';

export function CurrencyFlag({ currency }: { currency: CurrencyCode }) {
  return (
    <div className="text-grey-600 text-sm font-normal font-['Lato'] flex gap-[5px] items-center">
      <DenomIcon baseDenom={currency} className="h-[24px] block" />
      {currency}
    </div>
  );
}
