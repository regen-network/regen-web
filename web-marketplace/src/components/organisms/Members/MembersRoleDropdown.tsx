import { useLingui } from '@lingui/react';

import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import {
  ONLY_ADMIN_CANNOT_CHANGE,
  PLEASE_CONTACT_ADMIN,
} from './Members.constants';
import { MemberRoleDropdownProps } from './Members.types';
import { ROLE_ITEMS } from './Members.utils';

export const MemberRoleDropdown: React.FC<
  MemberRoleDropdownProps & { isOnlyAdmin?: boolean }
> = ({
  role,
  disabled = false,
  onChange,
  isOnlyAdmin = false,
  isCurrentUser,
}) => {
  const { _ } = useLingui();

  // Get tooltip conditions for members
  const getTooltipConditions = ({
    isOnlyAdmin,
    role,
    isCurrentUser,
  }: {
    isOnlyAdmin: boolean;
    role: string;
    isExternalAdmin?: boolean;
    orgRole?: string;
    currentUserRole?: string;
    isCurrentUser?: boolean;
  }) => {
    const showUserAdminTooltip =
      isOnlyAdmin && role === 'admin' && isCurrentUser;
    const showContactAdminTooltip = isCurrentUser && role !== 'admin';

    let tooltipTitle: string | undefined;
    if (showContactAdminTooltip) {
      tooltipTitle = _(PLEASE_CONTACT_ADMIN);
    } else if (showUserAdminTooltip) {
      tooltipTitle = _(ONLY_ADMIN_CANNOT_CHANGE);
    }

    return {
      tooltipTitle,
      disabled: Boolean(showUserAdminTooltip || showContactAdminTooltip),
    };
  };

  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      isCurrentUser={isCurrentUser}
      isOnlyAdmin={isOnlyAdmin}
      roleOptions={ROLE_ITEMS}
      getTooltipConditions={getTooltipConditions}
    />
  );
};
