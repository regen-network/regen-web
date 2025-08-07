import { BaseRoleDropdownProps } from '../BaseMembersTable/BaseMembersTable.types';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { ROLE_ITEMS } from './OrganizationMembers.utils';

export const MemberRoleDropdown: React.FC<
  Omit<BaseRoleDropdownProps, 'roleOptions'>
> = ({ role, disabled = false, onChange, isCurrentUser, currentUserRole }) => {
  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      isCurrentUser={isCurrentUser}
      currentUserRole={currentUserRole}
      roleOptions={ROLE_ITEMS}
    />
  );
};
