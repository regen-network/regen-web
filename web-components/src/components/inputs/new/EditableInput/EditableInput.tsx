import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { TextButton } from 'web-components/src/components/buttons/TextButton';

interface EditableInputProps {
  value: number;
  maxValue: number;
  onChange: (amount: number) => void;
  name?: string;
  inputAriaLabel: string;
  editButtonAriaLabel: string;
  updateButtonText: string;
  className?: string;
  onInvalidValue?: () => void;
  onKeyDown?: (credits: number) => void;
  hasError?: boolean;
}

export const EditableInput = ({
  value,
  maxValue,
  onChange,
  name = '',
  inputAriaLabel,
  editButtonAriaLabel,
  updateButtonText,
  className = '',
  onInvalidValue,
  onKeyDown,
  hasError,
}: EditableInputProps) => {
  const [editable, setEditable] = useState(false);
  const [amount, setAmount] = useState(value);

  useEffect(() => {
    if (!editable && value !== amount) setAmount(value);
  }, [amount, value, editable]);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const newValue = +value;

    if (isNaN(newValue)) return;
    if (newValue > maxValue && onInvalidValue) {
      onInvalidValue();
    }
    setAmount(Math.min(newValue, maxValue));
  };

  const handleOnUpdate = () => {
    if (!amountValid || hasError) return;
    onChange(+amount);
    toggleEditable();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isNaN(+e.currentTarget.value)) return;
      setAmount(+e.currentTarget.value);
      handleOnUpdate();
    }
  };

  useEffect(() => {
    onKeyDown && onKeyDown(amount);
  }, [amount, onKeyDown]);

  const amountValid = useMemo(
    () => amount <= maxValue && amount > 0,
    [amount, maxValue],
  );

  return (
    <>
      {editable ? (
        <div
          className={`flex [@media(max-width:340px)]:flex-col [@media(max-width:340px)]:mb-20 sm:flex-row items-center [@media(max-width:340px)]:items-start h-[47px] ${className}`}
        >
          <input
            type="number"
            step="0.000001"
            min={0}
            max={maxValue}
            className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-50 py-20 px-15 w-[120px] border border-solid border-grey-300 text-base font-normal font-sans focus:outline-none"
            value={amount}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            aria-label={inputAriaLabel}
            name={name}
            autoFocus
            data-testid="editable-input"
          />
          <TextButton
            className={`lowercase text-[12px] mt-5 sm:mt-0 font-sans ${
              amountValid && !hasError
                ? ''
                : 'text-grey-300 hover:text-grey-300 cursor-default'
            }`}
            onClick={handleOnUpdate}
            aria-label={updateButtonText}
          >
            {updateButtonText}
          </TextButton>
        </div>
      ) : (
        <div className="flex justify-between h-[47px] items-center">
          <span>{amount}</span>
          <EditButtonIcon
            onClick={toggleEditable}
            ariaLabel={editButtonAriaLabel}
          />
        </div>
      )}
    </>
  );
};
