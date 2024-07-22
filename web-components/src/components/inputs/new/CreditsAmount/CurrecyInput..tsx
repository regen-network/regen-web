import { lazy, useState } from 'react';
import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { PAYMENT_OPTIONS } from 'web-components/src/components/form/BuyCreditsForm/BuyCreditsForm.types';

import { CURRENCY_AMOUNT } from './CreditsAmount.constants';
import { CurrencyInputProps } from './CreditsAmount.types';

const CustomSelect = lazy(
  () =>
    import(
      'web-components/src/components/inputs/new/CustomSelect/CustomSelect'
    ),
);

export const CurrencyInput = ({
  maxCurrencyAmount,
  paymentOption,
  handleCurrencyAmountChange,
  handleCurrencyChange,
  defaultCryptoCurrency,
  register,
}: CurrencyInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <label
      htmlFor="currency-input"
      className={`${
        isFocused
          ? 'border-2 border-solid border-grey-500'
          : 'border border-solid border-grey-300'
      } grow sm:flex-1 w-full sm:w-auto flex justify-start relative pr-10 sm:h-60 rounded-sm`}
    >
      {paymentOption === PAYMENT_OPTIONS.CARD && (
        <span className="absolute top-[16px] left-10">$</span>
      )}
      <input
        id="currency-input"
        {...register(CURRENCY_AMOUNT, {
          value: 1,
        })}
        onChange={handleCurrencyAmountChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="number"
        className="h-full flex-grow p-20 border-none mr-10 text-base focus-visible:outline-none"
        max={maxCurrencyAmount}
        min={1}
        aria-label="Currency Input"
      />
      {paymentOption === PAYMENT_OPTIONS.CARD ? (
        <DenomIconWithCurrency currency={CURRENCIES.usd} />
      ) : (
        <CustomSelect
          options={Object.keys(CURRENCIES)
            .filter(currency => currency !== CURRENCIES.usd)
            .map(currency => ({
              component: {
                label: currency,
                element: () => (
                  <DenomIconWithCurrency currency={currency as Currency} />
                ),
              },
            }))}
          onSelect={handleCurrencyChange}
          defaultOption={defaultCryptoCurrency}
        />
      )}
    </label>
  );
};
