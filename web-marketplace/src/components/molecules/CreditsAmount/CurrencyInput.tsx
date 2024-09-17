import { ChangeEvent, lazy, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { DenomIconWithCurrency } from 'components/atoms/DenomIconWithCurrency/DenomIconWithCurrency';
import { CURRENCIES } from 'components/atoms/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { findDisplayDenom } from '../DenomLabel/DenomLabel.utils';
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
  defaultCryptoCurrency,
  currency,
  setCurrency,
  handleCurrencyAmountChange,
  cryptoCurrencies,
  displayDenom,
  allowedDenoms,
}: CurrencyInputProps) => {
  const {
    register,
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
      onChange(event);
      handleCurrencyAmountChange(event);
    },
    [handleCurrencyAmountChange, onChange],
  );

  const onHandleCurrencyChange = useCallback(
    (askDenom: string) => {
      setCurrency(
        askDenom === CURRENCIES.usd
          ? { askDenom: CURRENCIES.usd, askBaseDenom: CURRENCIES.usd }
          : {
              askDenom,
              askBaseDenom: cryptoCurrencies.filter(
                cur => cur.askDenom === askDenom,
              )?.[0].askBaseDenom,
            },
      );
    },
    [cryptoCurrencies, setCurrency],
  );

  return (
    <div className="grow sm:flex-1 w-full sm:w-auto relative">
      {paymentOption === PAYMENT_OPTIONS.CARD && (
        <span className="absolute top-[18px] left-10 z-50">$</span>
      )}
      <TextField
        ref={ref}
        name={name}
        onFocus={handleOnFocus}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        type="number"
        className={`${
          isFocused
            ? 'border-2 border-solid border-grey-500'
            : 'border border-solid border-grey-300'
        } w-full sm:w-auto flex justify-start relative pr-10 sm:h-60 rounded-sm items-center pl-5`}
        customInputProps={{
          max: maxCurrencyAmount,
          min: 0,
          step: '0.1',
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
            top: '-2px !important',
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
          '& .MuiInputAdornment-root': {
            'padding-top': '5px',
          },
        }}
        endAdornment={
          paymentOption === PAYMENT_OPTIONS.CARD ? (
            <DenomIconWithCurrency
              baseDenom={currency.askBaseDenom}
              displayDenom={displayDenom}
            />
          ) : (
            <CustomSelect
              options={cryptoCurrencies.map(currency => ({
                component: {
                  label: currency.askDenom,
                  element: () => (
                    <DenomIconWithCurrency
                      baseDenom={currency.askBaseDenom}
                      displayDenom={findDisplayDenom({
                        allowedDenoms,
                        bankDenom: currency.askDenom,
                        baseDenom: currency.askBaseDenom,
                      })}
                    />
                  ),
                },
              }))}
              onSelect={onHandleCurrencyChange}
              defaultOption={defaultCryptoCurrency.askDenom}
            />
          )
        }
      />
      {errors[CURRENCY_AMOUNT]?.message && (
        <div className="pl-20 pt-5 text-error-300 text-sm top-full left-0">
          {`${errors[CURRENCY_AMOUNT].message} ${displayDenom}`}
        </div>
      )}
    </div>
  );
};
