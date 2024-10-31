import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { EditButtonIcon } from 'web-components/src/components/buttons/EditButtonIcon';
import { TextButton } from 'web-components/src/components/buttons/TextButton';

import { sanitizeValue } from './EditableInput.utils';

interface EditableInputProps {
  value: number;
  maxValue: number;
  onChange: (amount: number) => void;
  name?: string;
  inputAriaLabel: string;
  editButtonAriaLabel: string;
  updateButtonText: string;
  cancelButtonText: string;
  className?: string;
  onInvalidValue?: () => void;
  onKeyDown?: (credits: number) => void;
  error?: {
    hasError: boolean;
    message: string;
  };
  isEditable: boolean;
}

export const EditableInput = ({
  value,
  maxValue,
  onChange,
  name = '',
  inputAriaLabel,
  editButtonAriaLabel,
  updateButtonText,
  cancelButtonText,
  className = '',
  onInvalidValue,
  onKeyDown,
  error,
  isEditable,
}: EditableInputProps) => {
  const [editable, setEditable] = useState(false);
  const [initialValue, setInitialValue] = useState(value);
  const [currentValue, setCurrentValue] = useState(value);
  const wrapperRef = useRef(null);

  const amountValid = useMemo(
    () => currentValue <= maxValue && currentValue > 0,
    [currentValue, maxValue],
  );

  const isUpdateDisabled =
    !amountValid || error?.hasError || initialValue === currentValue;

  useEffect(() => {
    setInitialValue(value);
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !(wrapperRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setEditable(false);
        setCurrentValue(initialValue);
      }
    };
    if (editable) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editable, initialValue]);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const sanitizedValue = sanitizeValue(value);
    if (sanitizedValue > maxValue && onInvalidValue) {
      onInvalidValue();
    }
    setCurrentValue(Math.min(sanitizedValue, maxValue));
  };

  const handleOnCancel = () => {
    setCurrentValue(initialValue);
    toggleEditable();
  };

  const handleOnUpdate = () => {
    if (isUpdateDisabled) return;
    onChange(currentValue);
    toggleEditable();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const sanitizedValue = sanitizeValue(e.currentTarget.value);
      setCurrentValue(sanitizedValue);
      handleOnUpdate();
    }
    if (e.key === 'Escape') {
      handleOnCancel();
    }
  };

  useEffect(() => {
    onKeyDown && onKeyDown(currentValue);
  }, [currentValue, onKeyDown]);

  return (
    <>
      {editable ? (
        <>
          <div
            ref={wrapperRef}
            className={`relative flex [@media(max-width:340px)]:flex-col [@media(max-width:340px)]:mb-20 sm:flex-row items-center [@media(max-width:340px)]:items-start h-[47px] ${className}`}
          >
            <input
              type="text"
              className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-50 py-20 px-15 w-[100px] border border-solid border-grey-300 text-base font-normal font-sans focus:outline-none"
              value={currentValue}
              onChange={handleOnChange}
              onKeyDown={handleKeyDown}
              aria-label={inputAriaLabel}
              name={name}
              autoFocus
              data-testid="editable-input"
            />
            <TextButton
              className={`lowercase text-[12px] mt-5 sm:mt-0 font-sans min-w-fit ml-10 ${
                isUpdateDisabled
                  ? 'text-grey-400 hover:text-grey-400 cursor-default'
                  : ''
              }`}
              onClick={handleOnUpdate}
              aria-label={updateButtonText}
            >
              {updateButtonText}
            </TextButton>
            <span className="text-grey-400 px-3">|</span>
            <TextButton
              className="lowercase text-[12px] mt-5 sm:mt-0 font-sans text-error-400 hover:text-error-200  min-w-fit"
              onClick={handleOnCancel}
              aria-label={cancelButtonText}
            >
              {cancelButtonText}
            </TextButton>
          </div>
          {error?.hasError && (
            <div className="pt-5 text-error-300 text-sm w-full absolute">
              {error?.message}
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-between h-[47px] items-center">
          <span>{currentValue}</span>
          {isEditable && (
            <EditButtonIcon
              onClick={toggleEditable}
              ariaLabel={editButtonAriaLabel}
            />
          )}
        </div>
      )}
    </>
  );
};
