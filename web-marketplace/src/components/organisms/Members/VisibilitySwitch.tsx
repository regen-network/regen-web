import React from 'react';
import { useLingui } from '@lingui/react';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { cn } from 'web-components/src/utils/styles/cn';

import {
  HIDDEN,
  PLEASE_CONTACT_ADMIN_VISIBILITY,
  VISIBLE,
} from './Members.constants';

export const VisibilitySwitch: React.FC<{
  checked: boolean;
  disabled?: boolean;
  isCurrentUser?: boolean;
  onChange: (val: boolean) => void;
}> = ({ checked, disabled, isCurrentUser, onChange }) => {
  const { _ } = useLingui();
  const label = checked ? _(VISIBLE) : _(HIDDEN);

  const button = (
    <button
      type="button"
      aria-pressed={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'inline-flex items-center rounded-full h-28 pr-3 py-3 gap-5 font-bold font-sans leading-none transition-colors duration-200 cursor-pointer text-bc-neutral-0 border-none',
        checked ? 'bg-ac-primary-500 pl-5' : 'bg-bc-neutral-700 pl-3',
        disabled && 'bg-bc-neutral-300 cursor-not-allowed',
      )}
    >
      {checked ? (
        <>
          <span>{label}</span>
          <span className="w-20 h-20 rounded-full bg-bc-neutral-0 shadow shrink-0 ml-4" />
        </>
      ) : (
        <>
          <span className="w-20 h-20 rounded-full bg-bc-neutral-0 shadow shrink-0 mr-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );

  return disabled && isCurrentUser ? (
    <InfoTooltip
      title={_(PLEASE_CONTACT_ADMIN_VISIBILITY)}
      arrow={true}
      placement="top"
      className="bg-bc-neutral-0"
    >
      <span>{button}</span>
    </InfoTooltip>
  ) : (
    button
  );
};
