import { ChangeEvent, lazy, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';
import { CURRENCIES } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency.constants';

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
  selectPlaceholderAriaLabel,
  selectAriaLabel,
  handleCurrencyAmountChange,
  cryptoCurrencies,
  displayDenom,
  allowedDenoms,
}: CurrencyInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ChooseCreditsFormSchemaType>();
  const { _ } = useLingui();

  const { onChange } = register(CURRENCY_AMOUNT);

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
        {...register(CURRENCY_AMOUNT)}
        onChange={handleOnChange}
        type="number"
        className={`border border-solid border-grey-300 focus-within:border-grey-500 focus-within:border-2 ${
          paymentOption === PAYMENT_OPTIONS.CARD ? 'pl-5' : ''
        } w-full sm:w-auto flex justify-start relative sm:h-60 rounded-sm items-center`}
        customInputProps={{
          max: maxCurrencyAmount,
          min: 0,
          step: '0.000001',
          'aria-label': _(msg`Currency Input`),
        }}
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
            paddingRight: theme =>
              paymentOption === PAYMENT_OPTIONS.CARD ? theme.spacing(5) : 0,
            '& input': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
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
          '& .MuiInputAdornment-root': {
            paddingTop: '5px',
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
              placeholderAriaLabel={selectPlaceholderAriaLabel}
              selectAriaLabel={selectAriaLabel}
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
