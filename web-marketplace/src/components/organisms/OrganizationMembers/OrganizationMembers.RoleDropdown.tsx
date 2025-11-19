import { useLingui } from '@lingui/react';

import { ROLE_OWNER } from '../ActionDropdown/ActionDropdown.constants';
import { BaseRoleDropdownProps } from '../BaseMembersTable/BaseMembersTable.types';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { getRoleItems } from './OrganizationMembers.utils';

type MemberRoleDropdownProps = Omit<BaseRoleDropdownProps, 'roleOptions'> & {
  hideOwnerOption?: boolean;
};
export const MemberRoleDropdown = ({
  role,
  disabled = false,
  onChange,
  currentUserRole,
  hasWalletAddress,
  placeholder,
  height,
  fullWidth,
  hideOwnerOption,
}: MemberRoleDropdownProps) => {
  const { _ } = useLingui();
  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      currentUserRole={currentUserRole}
      hasWalletAddress={hasWalletAddress}
      placeholder={placeholder}
      height={height}
      fullWidth={fullWidth}
      roleOptions={getRoleItems(_, hideOwnerOption && role !== ROLE_OWNER)}
    />
  );
};
