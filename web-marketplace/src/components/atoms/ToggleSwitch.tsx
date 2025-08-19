import React, { useId } from 'react';

import { cn } from 'web-components/src/utils/styles/cn';

/* eslint-disable lingui/no-unlocalized-strings */
const SIZE_CONFIG = {
  sm: {
    height: 'h-22',
    knob: 'w-16 h-16',
    font: 'text-xs',
    paddingX: { on: 'pl-3 pr-2', off: 'pl-2 pr-3' },
    paddingY: 'py-2',
    gap: 'gap-4',
    knobMargin: { on: 'ml-3', off: 'mr-3' },
  },
  md: {
    height: 'h-28',
    knob: 'w-20 h-20',
    font: 'text-[13.3333px]',
    paddingX: { on: 'pl-5 pr-3', off: 'pl-3 pr-5' },
    paddingY: 'py-3',
    gap: 'gap-5',
    knobMargin: { on: 'ml-4', off: 'mr-4' },
  },
} as const;

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  onLabel?: React.ReactNode;
  offLabel?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  onLabel,
  offLabel,
  ariaLabel,
  className,
  size = 'md',
}) => {
  const id = useId();
  const cfg = SIZE_CONFIG[size];
  const paddingX = checked ? cfg.paddingX.on : cfg.paddingX.off;
  const {
    height,
    knob: knobSize,
    font: fontSize,
    paddingY,
    gap,
    knobMargin,
  } = cfg;

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center rounded-full font-bold font-sans leading-none transition-colors duration-200 cursor-pointer text-bc-neutral-0 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ac-primary-500',
        gap,
        height,
        checked ? 'bg-ac-primary-500' : 'bg-bc-neutral-700',
        disabled && 'bg-bc-neutral-300 cursor-not-allowed',
        paddingX,
        paddingY,
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
      {checked ? (
        <>
          <span className={cn(fontSize)}>{onLabel}</span>
          <span
            className={cn(
              knobSize,
              'rounded-full bg-bc-neutral-0 shadow shrink-0',
              knobMargin.on,
            )}
          />
        </>
      ) : (
        <>
          <span
            className={cn(
              knobSize,
              'rounded-full bg-bc-neutral-0 shadow shrink-0',
              knobMargin.off,
            )}
          />
          <span className={cn(fontSize)}>{offLabel}</span>
        </>
      )}
    </label>
  );
};

export default ToggleSwitch;
