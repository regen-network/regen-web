export function SupCurrencyAndAmount({
  price,
  currencyCode,
  className = '',
}: {
  price: number;
  currencyCode: string;
  className?: string;
}) {
  return currencyCode === 'usd' ? (
    <span>
      <span className="align-top text-[11px] leading-normal">$</span>
      <span className={className}>{price.toFixed(2)}</span>
    </span>
  ) : (
    <span className={className}>{price}</span>
  );
}
