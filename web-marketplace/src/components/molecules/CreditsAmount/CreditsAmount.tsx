import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
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
import {
  getCreditsAvailablePerCurrency,
  getCurrencyPrice,
} from './CreditsAmount.utils';
import { CreditsInput } from './CreditsInput';
import { CurrencyInput } from './CurrecyInput';

export const CreditsAmount = ({
  creditDetails,
  paymentOption,
  currency,
  setCurrency,
}: CreditsAmountProps) => {
  const [pricePerCredit, setPricePerCredit] = useState(
    getCurrencyPrice(CURRENCIES.usd, creditDetails),
  );
  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
  const { setValue } = useFormContext();

  const [creditsAvailablePerCurrency, setCreditsAvailablePerCurrency] =
    useState(getCreditsAvailablePerCurrency(currency, creditDetails));

  useEffect(() => {
    setMaxCreditsSelected(false);
    setCreditsAvailablePerCurrency(
      getCreditsAvailablePerCurrency(currency, creditDetails),
    );
    const newPrice = getCurrencyPrice(currency, creditDetails);
    setPricePerCredit(newPrice);
    setCurrency(currency);
  }, [creditDetails, currency, paymentOption, setCurrency]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      setValue(CREDITS_AMOUNT, creditsAvailablePerCurrency);
      setValue(CURRENCY_AMOUNT, creditsAvailablePerCurrency * pricePerCredit);
      setMaxCreditsSelected(false);
    }
  }, [
    creditsAvailablePerCurrency,
    pricePerCredit,
    maxCreditsSelected,
    setMaxCreditsSelected,
    setValue,
  ]);

  // Credits amount change
  const handleCreditsAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const currentCreditsAmount = e.target.valueAsNumber;
      setValue(CREDITS_AMOUNT, currentCreditsAmount);

      const currentCurrencyAmount = parseFloat(e.target.value) * pricePerCredit;
      setValue(CURRENCY_AMOUNT, currentCurrencyAmount);
    },
    [pricePerCredit, setValue],
  );

  // Currency type change
  const handleCurrencyChange = useCallback(
    (currency: string) => {
      const newPrice = getCurrencyPrice(
        currency as CryptoCurrencies,
        creditDetails,
      );
      setPricePerCredit(newPrice);
      setValue(CURRENCY_AMOUNT, 0);
      setValue(CREDITS_AMOUNT, 0);
      setCurrency(currency as Currency);
      const creditsAvailablePerCurrency = getCreditsAvailablePerCurrency(
        currency as Currency,
        creditDetails,
      );
      setCreditsAvailablePerCurrency(creditsAvailablePerCurrency);
    },
    [creditDetails, setCurrency, setValue],
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
          handleCurrencyChange={handleCurrencyChange}
          defaultCryptoCurrency={
            currency === CURRENCIES.usd ? DEFAULT_CRYPTO_CURRENCY : currency
          }
          creditDetails={creditDetails}
          currency={currency}
          setCurrency={setCurrency}
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
          <Trans>
            Credit prices vary. By default the lowest priced credits will be
            purchased first.
          </Trans>
        </em>
      )}
    </div>
  );
};
