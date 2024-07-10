import {
  CurrencyCode,
  getCurrencySymbol,
} from 'web-components/src/utils/currency';

export function SupCurrencyAndAmount({
  currency,
  amount,
}: {
  currency: CurrencyCode;
  amount: string;
}) {
  return (
    <>
      <span className="align-top text-xs">
        {getCurrencySymbol(currency as CurrencyCode)}
      </span>
      {amount}
    </>
  );
}
