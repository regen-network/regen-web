import { useLingui } from '@lingui/react';
import { BaseRoleDropdownProps } from '../BaseMembersTable/BaseMembersTable.types';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { getRoleItems } from './OrganizationMembers.utils';

export const MemberRoleDropdown: React.FC<
  Omit<BaseRoleDropdownProps, 'roleOptions'>
> = ({
  role,
  disabled = false,
  onChange,
  currentUserRole,
  hasWalletAddress,
}) => {
  const { _ } = useLingui();
  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      currentUserRole={currentUserRole}
      hasWalletAddress={hasWalletAddress}
      roleOptions={getRoleItems(_)}
    />
  );
};
