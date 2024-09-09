import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import {
  CryptoCurrencies,
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import {
  CREDIT_VINTAGE_OPTIONS,
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
import { CurrencyInput } from './CurrencyInput';

export const CreditsAmount = ({
  creditDetails,
  paymentOption,
  currency,
  setCurrency,
  setSpendingCap,
  creditsAvailable,
  setCreditsAvailable,
  creditVintages,
}: CreditsAmountProps) => {
  const [pricePerCredit, setPricePerCredit] = useState(
    getCurrencyPrice(CURRENCIES.usd, creditDetails),
  );
  const [maxCreditsSelected, setMaxCreditsSelected] = useState(false);
  const { setValue, getValues } = useFormContext<ChooseCreditsFormSchemaType>();

  const creditVintageOptions = getValues(CREDIT_VINTAGE_OPTIONS);

  useEffect(() => {
    if (creditVintageOptions && creditVintageOptions.length > 0) {
      const getVintageCredits = (creditVintageOptions: string[]) => {
        return creditVintageOptions.reduce((sum: number, option: string) => {
          const credits =
            creditVintages.find(vintage => vintage.batchDenom === option)
              ?.credits || '0';
          return sum + +credits;
        }, 0);
      };
      setCreditsAvailable(getVintageCredits(creditVintageOptions));
      setSpendingCap(creditsAvailable);
    } else {
      setCreditsAvailable(
        getCreditsAvailablePerCurrency(currency, creditDetails),
      );
    }
  }, [
    creditDetails,
    creditVintageOptions,
    creditVintages,
    creditsAvailable,
    currency,
    setCreditsAvailable,
    setSpendingCap,
  ]);

  useEffect(() => {
    setMaxCreditsSelected(false);
    setCreditsAvailable(
      getCreditsAvailablePerCurrency(currency, creditDetails),
    );
    const newPrice = getCurrencyPrice(currency, creditDetails);
    setPricePerCredit(newPrice);
    setCurrency(currency);
  }, [
    creditDetails,
    currency,
    paymentOption,
    setCreditsAvailable,
    setCurrency,
  ]);

  // Max credits set
  useEffect(() => {
    if (maxCreditsSelected) {
      setValue(CREDITS_AMOUNT, creditsAvailable);
      setValue(CURRENCY_AMOUNT, creditsAvailable * pricePerCredit);
      setMaxCreditsSelected(false);
    }
  }, [
    creditsAvailable,
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
      setCurrency(currency as Currency);
      const creditsAvailablePerCurrency = getCreditsAvailablePerCurrency(
        currency as Currency,
        creditDetails,
      );
      setCreditsAvailable(creditsAvailablePerCurrency);
    },
    [creditDetails, setCreditsAvailable, setCurrency],
  );

  return (
    <div className={`grid min-h-min`} style={{ gridAutoRows: 'min-content' }}>
      <CreditsAmountHeader
        currency={currency}
        creditsAvailable={creditsAvailable}
        setMaxCreditsSelected={setMaxCreditsSelected}
        paymentOption={paymentOption}
      />
      <div className="flex justify-between min-w-full flex-wrap sm:flex-nowrap gap-10 items-start">
        <CurrencyInput
          maxCurrencyAmount={creditsAvailable * pricePerCredit}
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
          creditsAvailable={creditsAvailable}
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
