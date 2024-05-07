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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value, nextElementSibling },
      } = e;
      if (value.length > 1) {
        e.target.value = value.charAt(0);
        if (nextElementSibling !== null) {
          (nextElementSibling as HTMLInputElement).focus();
        }
      } else {
        if (value.match(inputProps.pattern)) {
          if (nextElementSibling !== null) {
            (nextElementSibling as HTMLInputElement).focus();
          }
        } else {
          e.target.value = '';
        }
      }
      sendResult();
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
      const pastedValue = e.clipboardData.getData('Text');
      let currentInput = 0;

      for (let i = 0; i < pastedValue.length; i++) {
        const pastedCharacter = pastedValue.charAt(i);
        if (pastedCharacter.match(inputProps.pattern)) {
          inputsRef.current[currentInput].value = pastedCharacter;
          if (inputsRef.current[currentInput].nextElementSibling !== null) {
            (
              inputsRef.current[currentInput]
                .nextElementSibling as HTMLInputElement
            ).focus();
            currentInput++;
          }
        }
      }
      sendResult();

      e.preventDefault();
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
          maxLength={1}
          className={cn(
            'w-45 h-60 bg-grey-0 border-grey-300 border mr-5 sm:mr-20 text-lg text-center p-0 focus:outline-0 rounded-sm border-solid',
            inputClassName,
          )}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={
            ariaLabel
              ? `${ariaLabel}. Character ${i + 1}.`
              : `Character ${i + 1}.`
          }
          disabled={disabled}
          placeholder={placeholder}
        />,
      );
    }

    return <div className={cn('flex', className)}>{inputs}</div>;
  },
);
