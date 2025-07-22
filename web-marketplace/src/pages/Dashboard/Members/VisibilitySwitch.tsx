import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { cn } from 'web-components/src/utils/styles/cn';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

export const VisibilitySwitch: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
}> = ({ checked, disabled, onChange }) => {
  const { _ } = useLingui();
  const label = checked ? _(msg`Visible`) : _(msg`Hidden`);

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

  return disabled ? (
    <InfoTooltip
      title={_(
        msg`Please contact your administrator to change your visibility.`,
      )}
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
