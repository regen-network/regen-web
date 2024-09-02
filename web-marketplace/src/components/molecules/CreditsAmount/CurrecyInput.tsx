import { ChangeEvent, lazy, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { DenomIconWithCurrency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency';
import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { CREDITS_AMOUNT, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import { CurrencyInputProps } from './CreditsAmount.types';
import { getCurrencyPrice } from './CreditsAmount.utils';

const CustomSelect = lazy(
  () =>
    import(
      'web-components/src/components/inputs/new/CustomSelect/CustomSelect'
    ),
);

export const CurrencyInput = ({
  maxCurrencyAmount,
  paymentOption,
  handleCurrencyChange,
  defaultCryptoCurrency,
  creditDetails,
  currency,
  setCurrency,
}: CurrencyInputProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ChooseCreditsFormSchemaType>();
  const { onChange, onBlur, name, ref } = register(CURRENCY_AMOUNT);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => setIsFocused(true);
  const handleOnBlur = (event: { target: any; type?: any }) => {
    setIsFocused(false);
    onBlur(event);
  };
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      const creditsQty =
        value / getCurrencyPrice(CURRENCIES[currency], creditDetails);
      setValue(CREDITS_AMOUNT, creditsQty);
      onChange(event);
    },
    [creditDetails, currency, onChange, setValue],
  );

  const onHandleCurrencyChange = useCallback(
    (currency: string) => {
      handleCurrencyChange(currency);
      setCurrency(currency as Currency);
    },
    [handleCurrencyChange, setCurrency],
  );

  return (
    <div className="grow sm:flex-1 w-full sm:w-auto relative">
      {paymentOption === PAYMENT_OPTIONS.CARD && (
        <span className="absolute top-[18px] left-10 z-50">$</span>
      )}
      <TextField
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        name={name}
        ref={ref}
        className={`${
          isFocused
            ? 'border-2 border-solid border-grey-500'
            : 'border border-solid border-grey-300'
        } w-full sm:w-auto flex justify-start relative pr-10 sm:h-60 rounded-sm items-center pl-5`}
        customInputProps={{
          max: maxCurrencyAmount,
          min: 0,
          step: '0.1',
          type: 'number',
          'aria-label': 'Currency Input',
        }}
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
          },
          '& .custom-select .MuiSvgIcon-root:not(.denom-icon)': {
            width: '15px !important',
            height: '15px !important',
            right: 'auto !important',
            top: '-3px !important',
            position: 'relative !important',
          },
          '& .MuiSvgIcon-root': {
            width: '25px !important',
            height: '25px !important',
            right: 'auto !important',
            top: 'auto !important',
            position: 'relative !important',
          },
          '& .MuiTypography-root': {
            'min-width': '60px',
          },
        }}
        endAdornment={
          paymentOption === PAYMENT_OPTIONS.CARD ? (
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
              onSelect={onHandleCurrencyChange}
              defaultOption={defaultCryptoCurrency}
            />
          )
        }
      />
      {errors[CURRENCY_AMOUNT]?.message && (
        <div className="pl-20 pt-5 text-error-300 text-sm top-full left-0">
          {`${errors[CURRENCY_AMOUNT].message} ${currency.toUpperCase()}`}
        </div>
      )}
    </div>
  );
};
