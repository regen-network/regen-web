import { USD_DENOM } from 'web-marketplace/src/config/allowedBaseDenoms';

export function SupCurrencyAndAmount({
  price,
  currencyCode,
  className = '',
}: {
  price: number;
  currencyCode: string;
  className?: string;
}) {
  return currencyCode === USD_DENOM ? (
    <span>
      <span className="align-top text-[11px] leading-normal">$</span>
      <span className={className}>{price.toFixed(2)}</span>
    </span>
  ) : (
    <span className={className}>{price}</span>
  );
}
