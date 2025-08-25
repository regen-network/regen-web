import React from 'react';
import { useLingui } from '@lingui/react';

import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';

import { ToggleSwitch } from 'components/atoms/ToggleSwitch';

import {
  HIDDEN,
  PLEASE_CONTACT_ADMIN_VISIBILITY,
  VISIBLE,
} from './OrganizationMembers.constants';
import { VisibilitySwitchProps } from './OrganizationMembers.types';

export const VisibilitySwitch: React.FC<VisibilitySwitchProps> = ({
  checked,
  disabled,
  isCurrentUser,
  onChange,
}) => {
  const { _ } = useLingui();
  const onLabel = _(VISIBLE);
  const offLabel = _(HIDDEN);

  const control = (
    <ToggleSwitch
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      onLabel={onLabel}
      offLabel={offLabel}
    />
  );

  if (disabled && isCurrentUser) {
    return (
      <InfoTooltip
        title={_(PLEASE_CONTACT_ADMIN_VISIBILITY)}
        arrow={true}
        placement="top"
        className="bg-bc-neutral-0"
      >
        <span>{control}</span>
      </InfoTooltip>
    );
  }
  return control;
};
