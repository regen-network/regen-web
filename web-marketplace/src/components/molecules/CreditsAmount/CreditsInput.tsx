import { ChangeEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Trans } from '@lingui/macro';
import { ChooseCreditsFormSchemaType } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { LeafIcon } from 'web-components/src/components/icons/LeafIcon';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';

import { CREDITS_AMOUNT } from './CreditsAmount.constants';
import { CreditsInputProps } from './CreditsAmount.types';

export const CreditsInput = ({
  creditsAvailable,
  handleCreditsAmountChange,
  paymentOption,
}: CreditsInputProps) => {
  const [maxCreditsAvailable, setMaxCreditsAvailable] =
    useState(creditsAvailable);
  const [isFocused, setIsFocused] = useState(false);
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<ChooseCreditsFormSchemaType>();
  const { onChange, onBlur, name, ref } = register(CREDITS_AMOUNT);

  const onHandleFocus = () => setIsFocused(true);
  const onHandleBlur = (event: { target: any; type?: any }) => {
    setIsFocused(false);
    onBlur(event);
  };

  useEffect(() => {
    setMaxCreditsAvailable(creditsAvailable);
  }, [creditsAvailable, paymentOption, setValue]);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    handleCreditsAmountChange(event);
  };

  return (
    <div className="flex-1 relative">
      <TextField
        className={`${
          isFocused ? 'border-2 border-grey-500' : 'border-grey-300'
        } border border-solid border-grey-300 flex items-center pr-10 sm:h-60`}
        type="number"
        customInputProps={{
          step: '0.000001',
          max: maxCreditsAvailable,
          min: 0,
          'aria-label': 'Credits Input',
        }}
        onChange={onHandleChange}
        onFocus={onHandleFocus}
        onBlur={onHandleBlur}
        name={name}
        ref={ref}
        sx={{
          '& .MuiInputBase-root': {
            border: 'none',
          },
        }}
        endAdornment={
          <span className="flex items-center">
            <LeafIcon className="mx-5" /> <Trans>credits</Trans>
          </span>
        }
      />
      {errors[CREDITS_AMOUNT] && (
        <div className="pl-20 pt-5 text-error-300 text-sm absolute top-full left-0">
          {`${errors[CREDITS_AMOUNT].message}`}
        </div>
      )}
    </div>
  );
};
