import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';

import {
  CryptoCurrencies,
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import {
  CREDITS_AMOUNT,
  CURRENCY_AMOUNT,
  DEFAULT_CRYPTO_CURRENCY,
} from './CreditsAmount.constants';
import { CreditsAmountHeader } from './CreditsAmount.Header';
import { CreditsAmountProps } from './CreditsAmount.types';
import { getCurrencyPrice } from './CreditsAmount.utils';
import { CreditsInput } from './CreditsInput';
import { CurrencyInput } from './CurrecyInput';

export const CreditsAmount = ({
  creditsAvailable,
  paymentOption,
  currency,
  onCurrencyChange,
}: CreditsAmountProps) => {
  const [currencyPrice, setCurrencyPrice] = useState(
    getCurrencyPrice(CURRENCIES.usd),
  );
  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
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
    const newPrice = getCurrencyPrice(currency);
    setCurrencyPrice(newPrice);
    form.setValue(CURRENCY_AMOUNT, newPrice * form.getValues(CREDITS_AMOUNT), {
      shouldDirty: true,
    });
  }, [form, paymentOption, currency]);

  useEffect(() => {
    if (paymentOption === PAYMENT_OPTIONS.CRYPTO) {
      onCurrencyChange(DEFAULT_CRYPTO_CURRENCY);
    }
    if (paymentOption === PAYMENT_OPTIONS.CARD) {
      onCurrencyChange(CURRENCIES.usd);
    }
  }, [onCurrencyChange, paymentOption]);

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
      onCurrencyChange(currency as Currency);
    },
    [form, onCurrencyChange],
  );

  return (
    <div className={`grid min-h-min sm:grid-rows-2`}>
      <CreditsAmountHeader
        currency={currency}
        creditsAvailable={creditsAvailable}
        setMaxCreditsSelected={setMaxCreditsSelected}
        paymentOption={paymentOption}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10">
        <CurrencyInput
          maxCurrencyAmount={creditsAvailable * currencyPrice}
          paymentOption={paymentOption}
          handleCurrencyAmountChange={handleCurrencyAmountChange}
          handleCurrencyChange={handleCurrencyChange}
          defaultCryptoCurrency={DEFAULT_CRYPTO_CURRENCY}
          {...form}
        />
        <span className="p-10 sm:p-20 text-xl">=</span>
        <CreditsInput
          creditsAvailable={creditsAvailable}
          handleCreditsAmountChange={handleCreditsAmountChange}
          {...form}
        />
      </div>
      {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
        <p className="italic text-xs m-0 py-20 self-start justify-self-start  sm:mb-20">
          Credit prices vary. By default the lowest priced credits will be
          purchased first.
        </p>
      )}
    </div>
  );
};
