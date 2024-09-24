import { CURRENCIES } from '../DenomIconWithCurrency/DenomIconWithCurrency.constants';

export function SupCurrencyAndAmount({
  price,
  currencyCode,
  className = '',
}: {
  price: number;
  currencyCode: string;
  className?: string;
}) {
  return currencyCode === CURRENCIES.usd ? (
    <span>
      <span className="align-top text-[11px] leading-normal">$</span>
      <span className={className}>{price.toFixed(2)}</span>
    </span>
  ) : (
    <span className={className}>{price}</span>
  );
}
