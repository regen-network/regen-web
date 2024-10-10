import { ChangeEvent, lazy, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';

import { findDisplayDenom } from '../DenomLabel/DenomLabel.utils';
import { CURRENCY, CURRENCY_AMOUNT } from './CreditsAmount.constants';
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
    setValue,
    control,
  } = useFormContext<ChooseCreditsFormSchemaType>();
  const { _ } = useLingui();

  const { onChange } = register(CURRENCY_AMOUNT);

  const currency = useWatch({
    control,
    name: CURRENCY,
  });

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // Remove zeros in non decimal values and update the value
      const value = event.target.value;
      if (!value.includes('.')) setValue(CURRENCY_AMOUNT, Number(value));
      onChange(event);
      handleCurrencyAmountChange(event);
    },
    [handleCurrencyAmountChange, onChange, setValue],
  );

  const onHandleCurrencyChange = useCallback(
    (askDenom: string) => {
      setValue(
        CURRENCY,
        askDenom === USD_DENOM
          ? { askDenom: USD_DENOM, askBaseDenom: USD_DENOM }
          : {
              askDenom,
              askBaseDenom: cryptoCurrencies.filter(
                cur => cur.askDenom === askDenom,
              )?.[0].askBaseDenom,
            },
      );
    },
    [cryptoCurrencies, setValue],
  );

  return (
    <div className="grow sm:flex-1 w-full sm:w-auto relative">
      {paymentOption === PAYMENT_OPTIONS.CARD && (
        <span className="text-xs sm:text-sm absolute top-[13px] left-[9px] sm:top-[18px] sm:left-10 z-50">
          $
        </span>
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
              baseDenom={currency?.askBaseDenom}
              displayDenom={displayDenom}
            />
          ) : (
            <CustomSelect
              options={cryptoCurrencies.map(cur => ({
                component: {
                  label: cur.askDenom,
                  element: () => (
                    <DenomIconWithCurrency
                      baseDenom={cur.askBaseDenom}
                      displayDenom={findDisplayDenom({
                        allowedDenoms,
                        bankDenom: cur.askDenom,
                        baseDenom: cur.askBaseDenom,
                      })}
                    />
                  ),
                },
              }))}
              onSelect={onHandleCurrencyChange}
              placeholderAriaLabel={selectPlaceholderAriaLabel}
              selectAriaLabel={selectAriaLabel}
              defaultOption={currency.askDenom}
            />
          )
        }
      />
      {errors[CURRENCY_AMOUNT]?.message && (
        <div className="pt-5 text-error-300 text-sm">
          {`${errors[CURRENCY_AMOUNT].message} ${displayDenom}`}
        </div>
      )}
    </div>
  );
};
