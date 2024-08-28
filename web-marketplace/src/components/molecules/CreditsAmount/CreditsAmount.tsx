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
}: CreditsAmountProps) => {
  const [pricePerCredit, setPricePerCredit] = useState(
    getCurrencyPrice(CURRENCIES.usd),
  );
  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
  const form = useFormContext();

  const [currency, setCurrency] = useState<Currency>(
    paymentOption === PAYMENT_OPTIONS.CRYPTO
      ? DEFAULT_CRYPTO_CURRENCY
      : CURRENCIES.usd,
  );

  const getCreditsAvailablePerCurrency = useCallback(
    (currency: Currency) => {
      const curr = creditsAvailable.find(item => item.currency === currency);
      return curr?.credits || 0;
    },
    [creditsAvailable],
  );

  const [creditsAvailablePerCurrency, setCreditsAvailablePerCurrency] =
    useState(getCreditsAvailablePerCurrency(currency));

  const resetFormValues = useCallback(() => {
    form.setValue(CREDITS_AMOUNT, 0);
    form.setValue(CURRENCY_AMOUNT, 0);
    setMaxCreditsSelected(false);
    const currency =
      paymentOption === PAYMENT_OPTIONS.CRYPTO
        ? DEFAULT_CRYPTO_CURRENCY
        : CURRENCIES.usd;
    setCreditsAvailablePerCurrency(getCreditsAvailablePerCurrency(currency));
    const newPrice = getCurrencyPrice(currency);
    setPricePerCredit(newPrice);
    if (paymentOption === PAYMENT_OPTIONS.CRYPTO) {
      setCurrency(DEFAULT_CRYPTO_CURRENCY);
    }
    if (paymentOption === PAYMENT_OPTIONS.CARD) {
      setCurrency(CURRENCIES.usd);
    }
  }, [form, getCreditsAvailablePerCurrency, paymentOption]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      form.setValue(CREDITS_AMOUNT, creditsAvailablePerCurrency);
      form.setValue(
        CURRENCY_AMOUNT,
        creditsAvailablePerCurrency * pricePerCredit,
      );
      setMaxCreditsSelected(false);
    }
  }, [
    creditsAvailablePerCurrency,
    pricePerCredit,
    form,
    maxCreditsSelected,
    setMaxCreditsSelected,
  ]);

  useEffect(() => {
    resetFormValues();
  }, [paymentOption, resetFormValues]);

  // Currency amount change
  const handleCurrencyAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      const currentCurrencyAmount = parseInt(value, 10) || 1;
      const creditsQty = currentCurrencyAmount / pricePerCredit;
      form.setValue(CREDITS_AMOUNT, creditsQty, {
        shouldDirty: true,
      });
    },
    [pricePerCredit, form],
  );

  // Credits amount change
  const handleCreditsAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentCreditsAmount = parseFloat(e.target.value);
      form.setValue(CREDITS_AMOUNT, currentCreditsAmount, {
        shouldDirty: true,
      });

      const currentCurrencyAmount =
        parseInt(e.target.value, 10) * pricePerCredit;
      form.setValue(CURRENCY_AMOUNT, currentCurrencyAmount, {
        shouldDirty: true,
      });
    },
    [pricePerCredit, form],
  );

  // Currency type change
  const handleCurrencyChange = useCallback(
    (currency: CryptoCurrencies | string) => {
      // TO-DO get real prices from API?
      const newPrice = getCurrencyPrice(currency as CryptoCurrencies);
      setPricePerCredit(newPrice);
      form.setValue(CURRENCY_AMOUNT, 0);
      form.setValue(CREDITS_AMOUNT, 0);
      setCurrency(currency as Currency);
      setCreditsAvailablePerCurrency(
        getCreditsAvailablePerCurrency(currency as Currency),
      );
    },
    [form, getCreditsAvailablePerCurrency],
  );

  return (
    <div className={`grid min-h-min`} style={{ gridAutoRows: 'min-content' }}>
      <CreditsAmountHeader
        currency={currency}
        creditsAvailable={creditsAvailablePerCurrency}
        setMaxCreditsSelected={setMaxCreditsSelected}
        paymentOption={paymentOption}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10 items-start">
        <CurrencyInput
          maxCurrencyAmount={creditsAvailablePerCurrency * pricePerCredit}
          paymentOption={paymentOption}
          handleCurrencyAmountChange={handleCurrencyAmountChange}
          handleCurrencyChange={handleCurrencyChange}
          defaultCryptoCurrency={DEFAULT_CRYPTO_CURRENCY}
        />
        <span className="p-10 sm:p-20 text-xl">=</span>
        <CreditsInput
          creditsAvailable={creditsAvailablePerCurrency}
          handleCreditsAmountChange={handleCreditsAmountChange}
          paymentOption={paymentOption}
        />
      </div>
      {paymentOption === PAYMENT_OPTIONS.CRYPTO && (
        <em className="italic text-xs m-0 py-20 self-start justify-self-start  sm:mb-20">
          Credit prices vary. By default the lowest priced credits will be
          purchased first.
        </em>
      )}
    </div>
  );
};
