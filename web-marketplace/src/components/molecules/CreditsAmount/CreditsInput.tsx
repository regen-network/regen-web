import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { LeafIcon } from 'web-components/src/components/icons/LeafIcon';

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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const { setValue, register } = useFormContext();

  useEffect(() => {
    setMaxCreditsAvailable(creditsAvailable);
  }, [creditsAvailable, paymentOption, setValue]);

  return (
    <label
      htmlFor="credits-input"
      className={`${
        isFocused ? 'border-2 border-grey-500' : 'border-grey-300'
      } border border-solid border-grey-300 flex-1 flex items-center pr-10 sm:h-60`}
    >
      <input
        id="credits-input"
        {...register(CREDITS_AMOUNT, {
          value: 0,
        })}
        onChange={handleCreditsAmountChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="number"
        className="h-full flex-grow p-20 border-none text-base focus-visible:outline-none"
        max={maxCreditsAvailable}
        min={0}
        aria-label="Credits Input"
        step="0.1"
      />
      <span className="flex items-center">
        <LeafIcon className="mx-5" /> credits
      </span>
    </label>
  );
};
