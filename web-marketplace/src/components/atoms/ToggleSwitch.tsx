import React, { useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from 'web-components/src/utils/styles/cn';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  visibleLabel?: React.ReactNode;
  hiddenLabel?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

export const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  visibleLabel = 'Visible',
  hiddenLabel = 'Hidden',
  ariaLabel,
  className,
}: ToggleSwitchProps) => {
  const id = useId();

  const spring = { type: 'spring', stiffness: 700, damping: 35 };

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center rounded-full h-28 py-3 gap-3 font-bold font-sans leading-none',
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

      {/* Knob */}
      <motion.span
        layout
        transition={spring}
        whileTap={!disabled ? { scale: 0.96 } : undefined}
        className={cn(
          'w-20 h-20 rounded-full bg-bc-neutral-0 shadow shrink-0',
          checked ? 'order-2' : 'order-1',
        )}
      />

      {/* Text container with animated swap */}
      <div
        className={cn(
          'relative overflow-hidden w-[48px] h-[14px] leading-[14px]',
          checked ? 'order-1 text-center' : 'order-2',
        )}
        aria-hidden={!ariaLabel ? undefined : true}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {checked ? (
            <motion.span
              key="visible"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 700, damping: 35 }}
              className="absolute inset-0 block text-[14px]"
            >
              {visibleLabel}
            </motion.span>
          ) : (
            <motion.span
              key="hidden"
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 700, damping: 35 }}
              className="absolute inset-0 block text-[14px]"
            >
              {hiddenLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </label>
  );
};

export default ToggleSwitch;
