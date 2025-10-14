import React, { ReactNode, useId } from 'react';
import { i18n } from '@lingui/core';
import { msg } from '@lingui/core/macro';

import { cn } from 'web-components/src/utils/styles/cn';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  visibleLabel?: ReactNode;
  hiddenLabel?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  visibleLabel = i18n._(msg`Visible`),
  hiddenLabel = i18n._(msg`Hidden`),
  ariaLabel,
  className,
}: ToggleSwitchProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        'relative inline-flex items-center rounded-full h-[26px] font-bold font-sans leading-none',
        'transition-colors duration-200 cursor-pointer select-none',
        'text-bc-neutral-0 focus-visible:outline focus-visible:outline-2',
        'focus-visible:outline-offset-2 focus-visible:outline-ac-primary-500',
        checked ? 'bg-ac-primary-500' : 'bg-bc-neutral-700',
        'px-3',
        disabled && 'opacity-60 cursor-not-allowed',
        className,
      )}
      aria-disabled={disabled || undefined}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={e => !disabled && onChange(e.target.checked)}
      />
      <div
        className="relative"
        style={{ width: '71px', height: 0 }}
        aria-hidden
      />

      <span
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2',
          'w-20 h-20 rounded-full bg-bc-neutral-0 shadow shrink-0',
          'transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] will-change-transform',
          checked ? 'translate-x-[51px]' : 'translate-x-0',
          !disabled && 'active:scale-[0.96]',
        )}
      />
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2',
          checked ? 'left-3' : 'left-[calc(3px+20px+3px)]',
          'w-[48px] h-[14px] leading-[14px] text-center overflow-hidden',
        )}
        aria-hidden={!ariaLabel ? undefined : true}
      >
        {/* Hidden label */}
        <span
          className={cn(
            'absolute inset-0 block text-[14px]',
            'transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]',
            checked
              ? 'opacity-0 translate-y-[-12px]'
              : 'opacity-100 translate-y-0',
          )}
        >
          {hiddenLabel}
        </span>

        {/* Visible label */}
        <span
          className={cn(
            'absolute inset-0 block text-[14px]',
            'transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]',
            checked
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[12px]',
          )}
        >
          {visibleLabel}
        </span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
