import { useLingui } from '@lingui/react';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { PLEASE_CONTACT_ADMIN } from './OrganizationMembers.constants';
import { MemberRoleDropdownProps } from './OrganizationMembers.types';
import { ROLE_ITEMS } from './OrganizationMembers.utils';

export const MemberRoleDropdown: React.FC<MemberRoleDropdownProps> = ({
  role,
  disabled = false,
  onChange,
  isCurrentUser,
}) => {
  const { _ } = useLingui();

  // Get tooltip conditions for members
  const getTooltipConditions = ({
    role,
    isCurrentUser,
  }: {
    role: string;
    isExternalAdmin?: boolean;
    orgRole?: string;
    currentUserRole?: string;
    isCurrentUser?: boolean;
  }) => {
    const showContactAdminTooltip =
      isCurrentUser && role !== ROLE_ADMIN && role !== ROLE_OWNER;

    let tooltipTitle: string | undefined;
    if (showContactAdminTooltip) {
      tooltipTitle = _(PLEASE_CONTACT_ADMIN);
    }

    return {
      tooltipTitle,
      disabled: !!showContactAdminTooltip,
    };
  };

  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      isCurrentUser={isCurrentUser}
      roleOptions={ROLE_ITEMS}
      getTooltipConditions={getTooltipConditions}
    />
  );
};
