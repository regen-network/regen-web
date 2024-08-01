import { useState } from 'react';
import { LeafIcon } from 'web-components/src/components/icons/LeafIcon';

import { CREDITS_AMOUNT } from './CreditsAmount.constants';
import { CreditsInputProps } from './CreditsAmount.types';

export const CreditsInput = ({
  creditsAvailable,
  handleCreditsAmountChange,
  register,
  formState,
}: CreditsInputProps) => {
  // const { isDirty } = formState;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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
          value: 1,
        })}
        onChange={handleCreditsAmountChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="number"
        className="h-full flex-grow p-20 border-none text-base focus-visible:outline-none"
        max={creditsAvailable}
        min={1}
        aria-label="Credits Input"
      />
      <span className="flex items-center">
        <LeafIcon className="mx-5" /> credits
      </span>
    </label>
  );
};
