import { ChangeEvent } from 'react';
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
}: CreditsInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ChooseCreditsFormSchemaType>();
  const { onChange } = register(CREDITS_AMOUNT);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    handleCreditsAmountChange(event);
  };

  return (
    <div className="flex-1 relative">
      <TextField
        className={`border border-solid border-grey-300 focus-within:border-grey-500 focus-within:border-2 border border-solid border-grey-300 flex items-center pr-10 sm:h-60`}
        type="number"
        customInputProps={{
          step: '0.000001',
          max: creditsAvailable,
          min: 0,
          'aria-label': 'Credits Input',
        }}
        {...register(CREDITS_AMOUNT)}
        onChange={onHandleChange}
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
        <div className="pl-20 pt-5 text-error-300 text-sm absolute top-full left-0">
          {`${errors[CREDITS_AMOUNT].message}`}
        </div>
      )}
    </div>
  );
};
