import { ChangeEvent, FocusEvent, lazy, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { USD_DENOM } from 'config/allowedBaseDenoms';
import { useAtomValue } from 'jotai';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { paymentOptionAtom } from 'pages/BuyCredits/BuyCredits.atoms';
import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { BuyCreditsSchemaTypes } from 'pages/BuyCredits/BuyCredits.types';
import { updateMultiStepCurrencyAndPaymentOption } from 'pages/BuyCredits/BuyCredits.utils';
import { DenomIconWithCurrency } from 'components/molecules/DenomIconWithCurrency/DenomIconWithCurrency';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { findDisplayDenom } from '../DenomLabel/DenomLabel.utils';
import { CURRENCY, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import { CurrencyInputProps } from './CreditsAmount.types';
import { formatCurrencyAmountTwoDecimals } from './CreditsAmount.utils';

const CustomSelect = lazy(
  () =>
    import(
      'web-components/src/components/inputs/new/CustomSelect/CustomSelect'
    ),
);

export const CurrencyInput = ({
  maxCurrencyAmount,
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
  const { data, handleSave, activeStep } =
    useMultiStep<BuyCreditsSchemaTypes>();
  const paymentOption = useAtomValue(paymentOptionAtom);
  const card = paymentOption === PAYMENT_OPTIONS.CARD;
  const { onChange } = register(CURRENCY_AMOUNT);

  const currency = useWatch({
    control,
    name: CURRENCY,
  });

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      handleCurrencyAmountChange(event);
    },
    [handleCurrencyAmountChange, onChange],
  );

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      let value = event.target.value;
      const decimalPart = value.split('.')?.[1];
      // Check if the value has a decimal part longer than 2 digits,
      // or if the value starts with leading zero/s
      if (
        (decimalPart &&
          decimalPart.length > 2 &&
          paymentOption === PAYMENT_OPTIONS.CARD) ||
        /^0[0-9]/.test(value)
      ) {
        value = value.replace(/^0+/, '');
        setValue(
          CURRENCY_AMOUNT,
          formatCurrencyAmountTwoDecimals(value, false),
          {
            shouldValidate: true,
          },
        );
      }
    },
    [paymentOption, setValue],
  );

  const handleOnBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>): void => {
      // If the value is empty, set it to 0
      const value = event.target.value;
      if (value === '') {
        setValue(CURRENCY_AMOUNT, 0, { shouldValidate: true });
      }
    },
    [setValue],
  );

  const onHandleCurrencyChange = useCallback(
    (askDenom: string) => {
      const currency =
        askDenom === USD_DENOM
          ? { askDenom: USD_DENOM, askBaseDenom: USD_DENOM }
          : {
              askDenom,
              askBaseDenom: cryptoCurrencies.filter(
                cur => cur.askDenom === askDenom,
              )?.[0].askBaseDenom,
            };
      setValue(CURRENCY, currency);
      updateMultiStepCurrencyAndPaymentOption(
        handleSave,
        data,
        currency,
        activeStep,
        paymentOption,
      );
    },
    [activeStep, cryptoCurrencies, data, handleSave, paymentOption, setValue],
  );

  return (
    <div className="grow sm:flex-1 w-full sm:w-auto relative">
      {card && (
        <span className="text-xs sm:text-sm absolute top-[13px] left-[9px] sm:top-[18px] sm:left-10 z-50">
          $
        </span>
      )}
      <TextField
        {...register(CURRENCY_AMOUNT)}
        onChange={handleOnChange}
        onInput={handleInput}
        onBlur={handleOnBlur}
        type="number"
        className={`border border-solid border-grey-300 focus-within:border-grey-500 focus-within:border-2 ${
          card ? 'pl-5' : ''
        } w-full sm:w-auto flex justify-start relative sm:h-60 rounded-sm items-center`}
        customInputProps={{
          max: maxCurrencyAmount,
          min: card ? 0.5 : 0,
          step: card ? '0.01' : '0.000001',
          'aria-label': _(msg`Currency Input`),
        }}
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
            paddingRight: theme => (card ? theme.spacing(5) : 0),
            '& input': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          },
          '& .custom-select .MuiSvgIcon-root:not(.denom-icon)': {
            width: '10px !important',
            height: '10px !important',
            right: 'auto !important',
            top: '1px !important',
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
          card ? (
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
              defaultOption={currency?.askDenom}
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
