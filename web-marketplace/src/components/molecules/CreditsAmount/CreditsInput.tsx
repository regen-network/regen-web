import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAtomValue } from 'jotai';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { LeafIcon } from 'web-components/src/components/icons/LeafIcon';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { paymentOptionAtom } from 'pages/BuyCredits/BuyCredits.atoms';
import { BuyCreditsSchemaTypes } from 'pages/BuyCredits/BuyCredits.types';
import { resetCurrencyAndCredits } from 'pages/BuyCredits/BuyCredits.utils';
import { useMultiStep } from 'components/templates/MultiStepTemplate';

import { CREDITS_AMOUNT } from './CreditsAmount.constants';
import { CreditsInputProps } from './CreditsAmount.types';

export const CreditsInput = ({
  creditsAvailable,
  handleCreditsAmountChange,
  orderedSellOrders,
  creditTypePrecision,
}: CreditsInputProps) => {
  const { _ } = useLingui();

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ChooseCreditsFormSchemaType>();
  const { onChange } = register(CREDITS_AMOUNT);
  const paymentOption = useAtomValue(paymentOptionAtom);
  const {
    data,
    handleSave: updateMultiStepData,
    activeStep,
  } = useMultiStep<BuyCreditsSchemaTypes>();

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    handleCreditsAmountChange(event);
  };

  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      let value = event.target.value;

      // Check if the value starts with a dot and add a leading zero
      if (/^\.[0-9]/.test(value)) {
        setValue(CREDITS_AMOUNT, +`0${value}`, {
          shouldValidate: true,
        });
      }
      if (/^0[0-9]/.test(value)) {
        // remove extra leading zeros
        value = value.replace(/^0+/, '');
        setValue(CREDITS_AMOUNT, parseFloat(Number(value).toFixed(2)), {
          shouldValidate: true,
        });
      }
    },
    [setValue],
  );

  const handleOnBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>): void => {
      // If the value is empty or 0 reset the currency and credit fields.
      const value = event.target.value;
      if (value === '' || parseFloat(value) === 0) {
        resetCurrencyAndCredits(
          paymentOption,
          orderedSellOrders,
          creditTypePrecision,
          setValue,
          updateMultiStepData,
          data,
          activeStep,
        );
      }
    },
    [
      activeStep,
      creditTypePrecision,
      data,
      orderedSellOrders,
      paymentOption,
      setValue,
      updateMultiStepData,
    ],
  );

  return (
    <div className="flex-1 relative">
      <TextField
        className={`focus-within:border-grey-500 focus-within:border-2 border border-solid border-grey-300 flex items-center pr-10 sm:h-60`}
        type="number"
        customInputProps={{
          step: '0.000001',
          max: creditsAvailable,
          min: 0,
          'aria-label': _(msg`Credits Input`),
        }}
        {...register(CREDITS_AMOUNT)}
        onChange={onHandleChange}
        onInput={handleInput}
        onBlur={handleOnBlur}
        placeholder="0"
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
            '& input': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          },
        }}
        endAdornment={
          <span className="flex items-center">
            <LeafIcon className="mx-5" /> <Trans>credits</Trans>
          </span>
        }
      />
      {errors[CREDITS_AMOUNT] && (
        <div className="pt-5 text-error-300 text-sm">
          {`${errors[CREDITS_AMOUNT].message}`}
        </div>
      )}
    </div>
  );
};
