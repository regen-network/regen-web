import { CURRENCIES } from 'web-marketplace/src/components/atoms/DenomIconWithCurrency/DenomIconWithCurrency.constants';

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
    <>
      <span className="align-top text-xs">$</span>
      <span className={className}>{price.toFixed(2)}</span>
    </>
  ) : (
    <span className={className}>{price}</span>
  );
}
