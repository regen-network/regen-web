import { USD_DENOM } from 'web-marketplace/src/config/allowedBaseDenoms';

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
      <span className={className}>{Number(price).toFixed(2)}</span>
    </span>
  ) : (
    <span className={className}>{price}</span>
  );
}
