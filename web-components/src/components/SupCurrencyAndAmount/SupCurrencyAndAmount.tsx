import { USD_DENOM } from 'web-marketplace/src/config/allowedBaseDenoms';

import { localizeNumber } from '../inputs/new/EditableInput/EditableInput.utils';

export function SupCurrencyAndAmount({
  price,
  currencyCode,
  className = '',
}: {
  price: number | string;
  currencyCode: string | undefined;
  className?: string;
}) {
  return currencyCode && currencyCode === USD_DENOM ? (
    <span>
      <span className="align-top text-[11px] leading-normal">$</span>
      <span className={className}>
        {localizeNumber(+Number(price).toFixed(2))}
      </span>
    </span>
  ) : (
    <span className={className}>{localizeNumber(+price)}</span>
  );
}
