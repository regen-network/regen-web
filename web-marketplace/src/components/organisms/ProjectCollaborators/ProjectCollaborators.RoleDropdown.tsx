import { useLingui } from '@lingui/react';
import { BaseRoleDropdownProps } from '../BaseMembersTable/BaseMembersTable.types';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { getRoleItems } from './ProjectCollaborators.utils';

export const RoleDropdown = ({
  role,
  onChange,
  disabled = false,
  currentUserRole,
  hasWalletAddress,
}: Omit<BaseRoleDropdownProps, 'roleOptions'>) => {
  const { _ } = useLingui();
  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      roleOptions={getRoleItems(_)}
      currentUserRole={currentUserRole}
      hasWalletAddress={hasWalletAddress}
    />
  );
};
