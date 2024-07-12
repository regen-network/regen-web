export function SupCurrencyAndAmount({
  price,
  currencyCode,
}: {
  price: number;
  currencyCode: string;
}) {
  let formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);

  if (currencyCode === 'USD') {
    const firstLetter = formattedPrice.charAt(0);
    const restOfString = formattedPrice.slice(1);
    formattedPrice = firstLetter + restOfString;
    return (
      <>
        <span className="align-top text-xs">{firstLetter}</span>
        {restOfString}
      </>
    );
  }
  return formattedPrice;
}
