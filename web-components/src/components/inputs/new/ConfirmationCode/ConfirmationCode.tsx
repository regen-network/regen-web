import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { cn } from '../../../../utils/styles/cn';
import {
  ConfirmationCodeProps,
  ConfirmationCodeRef,
  InputProps,
} from './ConfirmationCode.types';

/**
 * A component that displays a confirmation code input field.
 */
export const ConfirmationCode = forwardRef<
  ConfirmationCodeRef,
  ConfirmationCodeProps
>(
  (
    {
      ariaLabel,
      autoFocus = true,
      className,
      disabled,
      inputClassName,
      isPassword = false,
      length = 6,
      placeholder,
      onChange,
    },
    ref,
  ) => {
    if (isNaN(length) || length < 1) {
      // eslint-disable-next-line lingui/no-unlocalized-strings
      throw new Error('Length should be a number and greater than 0');
    }

    const inputsRef = useRef<Array<HTMLInputElement>>([]);
    const inputProps: InputProps = {
      type: 'tel',
      inputMode: 'numeric',
      pattern: '[0-9]{1}',
      min: '0',
      max: '9',
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputsRef.current) {
          inputsRef.current[0].focus();
        }
      },
      clear: () => {
        if (inputsRef.current) {
          for (let i = 0; i < inputsRef.current.length; i++) {
            inputsRef.current[i].value = '';
          }
          inputsRef.current[0].focus();
        }
        sendResult();
      },
    }));

    useEffect(() => {
      if (autoFocus) {
        inputsRef.current[0].focus();
      }
    }, [autoFocus]);

    const sendResult = () => {
      const res = inputsRef.current.map(input => input.value).join('');
      onChange && onChange(res);
    };

    /**
     * Handles entering multiple characters at once
     */
    const handleMultiCharacterInput = (value: string): void => {
      if (value.match(inputProps.pattern)) {
        const chars = value.split('');

        // Fill all inputs
        chars.forEach((char, index) => {
          if (index < length && inputsRef.current && inputsRef.current[index]) {
            inputsRef.current[index].value = char;
          }
        });

        // Focus last filled input
        const lastFilledIndex = Math.min(chars.length - 1, length - 1);
        if (inputsRef.current && inputsRef.current[lastFilledIndex]) {
          inputsRef.current[lastFilledIndex].focus();
        }
      }
    };

    /**
     * Handles typing a single character
     */
    const handleSingleCharacterInput = (
      value: string,
      currentInput: HTMLInputElement,
      nextElement: Element | null,
    ): void => {
      const isValidCharacter = value.match(inputProps.pattern);

      if (isValidCharacter) {
        // If valid move to next input
        if (nextElement) {
          (nextElement as HTMLInputElement).focus();
        }
      } else {
        // If invalid clear the input
        currentInput.value = '';
      }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value, nextElementSibling } = e.target;

      if (value.match(inputProps.pattern)) {
        if (value.length > 1) {
          handleMultiCharacterInput(value);
        } else {
          handleSingleCharacterInput(value, e.target, nextElementSibling);
        }

        sendResult();
      } else {
        e.target.value = '';
      }
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const target = e.target as HTMLInputElement;
      if (key === 'Backspace') {
        if (target.value === '') {
          if (target.previousElementSibling !== null) {
            const t = target.previousElementSibling as HTMLInputElement;
            t.value = '';
            t.focus();
            e.preventDefault();
          }
        } else {
          target.value = '';
        }
        sendResult();
      }
    };

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      // eslint-disable-next-line lingui/no-unlocalized-strings
      const pastedValue = e.clipboardData.getData('Text');
      handleMultiCharacterInput(pastedValue);
      sendResult();
    };

    const inputs = [];
    for (let i = 0; i < length; i++) {
      inputs.push(
        <input
          key={i}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onFocus={handleOnFocus}
          onPaste={handleOnPaste}
          {...inputProps}
          type={isPassword ? 'password' : inputProps.type}
          ref={(el: HTMLInputElement) => {
            inputsRef.current[i] = el;
          }}
          maxLength={i === 0 ? length : 1}
          className={cn(
            'w-45 h-60 bg-grey-0 border-grey-300 border mr-5 sm:mr-20 text-lg text-center p-0 focus:outline-0 rounded-sm border-solid',
            inputClassName,
          )}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`${ariaLabel} ${i + 1}.`}
          disabled={disabled}
          placeholder={placeholder}
        />,
      );
    }

    return <div className={cn('flex', className)}>{inputs}</div>;
  },
);
