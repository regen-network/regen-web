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
    <>
      <span className="align-top text-xs">$</span>
      <span className={className}>{price.toFixed(2)}</span>
    </>
  ) : (
    <span className={className}>{price}</span>
  );
}
