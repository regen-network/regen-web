import React, { useId } from 'react';

import { cn } from 'web-components/src/utils/styles/cn';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  onLabel?: React.ReactNode;
  offLabel?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  onLabel,
  offLabel,
  ariaLabel,
  className,
}: ToggleSwitchProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center rounded-full h-28 py-3 gap-3 font-bold font-sans leading-none transition-colors duration-200 cursor-pointer text-bc-neutral-0 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac-primary-500',
        checked
          ? 'bg-ac-primary-500 pl-5 pr-3'
          : 'bg-bc-neutral-700 pl-3 pr-[8px]',
        disabled && 'bg-bc-neutral-300 cursor-not-allowed',
        className,
      )}
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
      <span
        className={cn(
          'w-20 h-20 rounded-full bg-bc-neutral-0 shadow shrink-0 transition-transform duration-200',
          checked ? 'order-2 ml-4' : 'order-1 mr-4',
        )}
      />
      <span
        className={cn(
          'text-[14px] w-[43px] block',
          checked ? 'order-1' : 'order-2',
        )}
      >
        {checked ? onLabel : offLabel}
      </span>
    </label>
  );
};

export default ToggleSwitch;
