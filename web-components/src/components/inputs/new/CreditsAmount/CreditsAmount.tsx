import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  CryptoCurrencies,
  CURRENCIES,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import { PAYMENT_OPTIONS } from 'web-components/src/components/form/ChooseCreditsForm/ChooseCreditsForm.types';

import { CREDITS_AMOUNT, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import { CreditsAmountHeader } from './CreditsAmount.Header';
import { CreditsAmountProps } from './CreditsAmount.types';
import { getCurrencyPrice } from './CreditsAmount.utils';
import { CreditsInput } from './CreditsInput';
import { CurrencyInput } from './CurrecyInput.';

export const CreditsAmount = ({
  creditsAvailable,
  paymentOption,
}: CreditsAmountProps) => {
  const [currencyPrice, setCurrencyPrice] = useState(
    getCurrencyPrice(CURRENCIES.usd),
  );
  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);

  const defaultCryptoCurrency = CURRENCIES.uregen;

  const form = useFormContext();

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      form.setValue(CREDITS_AMOUNT, creditsAvailable);
      form.setValue(CURRENCY_AMOUNT, creditsAvailable * currencyPrice);
      setMaxCreditsSelected(false);
    }
  }, [
    creditsAvailable,
    currencyPrice,
    form,
    maxCreditsSelected,
    setMaxCreditsSelected,
  ]);

  // Payment option change
  useEffect(() => {
    const currency =
      paymentOption === PAYMENT_OPTIONS.CRYPTO
        ? defaultCryptoCurrency
        : CURRENCIES.usd;
    const newPrice = getCurrencyPrice(currency);
    setCurrencyPrice(newPrice);
    form.setValue(CURRENCY_AMOUNT, newPrice * form.getValues(CREDITS_AMOUNT), {
      shouldDirty: true,
    });
  }, [defaultCryptoCurrency, form, paymentOption]);

  // Currency amount change
  const handleCurrencyAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      const currentCurrencyAmount = parseInt(value, 10) || 1;
      const creditsQty = currentCurrencyAmount / currencyPrice;
      form.setValue(CREDITS_AMOUNT, creditsQty, {
        shouldDirty: true,
      });
    },
    [currencyPrice, form],
  );

  // Credits amount change
  const handleCreditsAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentCreditsAmount = parseInt(e.target.value, 10);
      form.setValue(CREDITS_AMOUNT, currentCreditsAmount, {
        shouldDirty: true,
      });

      const currentCurrencyAmount =
        parseInt(e.target.value, 10) * currencyPrice;
      form.setValue(CURRENCY_AMOUNT, currentCurrencyAmount, {
        shouldDirty: true,
      });
    },
    [currencyPrice, form],
  );

  // Currency type change
  const handleCurrencyChange = useCallback(
    (currency: CryptoCurrencies | string) => {
      // TO-DO get real prices from API?
      const newPrice = getCurrencyPrice(currency as CryptoCurrencies);
      setCurrencyPrice(newPrice);
      form.setValue(
        CURRENCY_AMOUNT,
        newPrice * form.getValues(CREDITS_AMOUNT),
        {
          shouldDirty: true,
        },
      );
    },
    [form],
  );

  return (
    <>
      <CreditsAmountHeader
        creditsAvailable={creditsAvailable}
        paymentOption={paymentOption}
        setMaxCreditsSelected={setMaxCreditsSelected}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10">
        <CurrencyInput
          maxCurrencyAmount={creditsAvailable * currencyPrice}
          paymentOption={paymentOption}
          handleCurrencyAmountChange={handleCurrencyAmountChange}
          handleCurrencyChange={handleCurrencyChange}
          defaultCryptoCurrency={defaultCryptoCurrency}
          {...form}
        />
        <span className="grow-0 p-10 sm:p-20 text-xl">=</span>
        <CreditsInput
          creditsAvailable={creditsAvailable}
          handleCreditsAmountChange={handleCreditsAmountChange}
          {...form}
        />
      </div>
      {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
        <p className="grow-0 italic text-xs m-0 py-20 self-start justify-self-start">
          Credit prices vary. By default the lowest priced credits will be
          purchased first.
        </p>
      )}
    </>
  );
};
