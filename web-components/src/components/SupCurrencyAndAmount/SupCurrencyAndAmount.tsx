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
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  if (currencyCode === CURRENCIES.usd) {
    const firstLetter = formattedPrice.charAt(0);
    const restOfString = formattedPrice.slice(1);
    formattedPrice = firstLetter + restOfString;
    return (
      <>
        <span className="align-top text-xs">{firstLetter}</span>
        <span className={className}>{restOfString}</span>
      </>
    );
  }
  return formattedPrice;
}
