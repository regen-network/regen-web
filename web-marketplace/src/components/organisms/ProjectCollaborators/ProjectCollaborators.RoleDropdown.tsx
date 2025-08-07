import { useLingui } from '@lingui/react';

import {
  BaseRoleDropdownProps,
  ProjectRole,
} from '../BaseMembersTable/BaseMembersTable.types';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { ROLE_HIERARCHY, ROLE_OPTIONS } from './ProjectCollaborators.utils';

export const RoleDropdown = ({
  role,
  onChange,
  disabled = false,
  currentUserRole,
  isCurrentUser = false,
}: Omit<BaseRoleDropdownProps, 'roleOptions'>) => {
  const { _ } = useLingui();

  // Get unavailable roles function
  const getUnavailableRoles = (currentRole: string) => (key: string) => {
    if (currentRole === 'viewer') return false;

    // const level = ROLE_HIERARCHY[key as ProjectRole];

    // return level > ROLE_HIERARCHY[orgRole as ProjectRole];
    // TODO
    return false;
  };

  return (
    <BaseRoleDropdown
      role={role}
      disabled={disabled}
      onChange={onChange}
      isCurrentUser={isCurrentUser}
      roleOptions={ROLE_OPTIONS}
      // getUnavailableRoles={getUnavailableRoles}
      currentUserRole={currentUserRole}
    />
  );
};
