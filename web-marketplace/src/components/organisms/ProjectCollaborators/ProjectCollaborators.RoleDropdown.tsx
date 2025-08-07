import { useLingui } from '@lingui/react';

import { ProjectRole } from '../BaseMembersTable/BaseMembersTable.types';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import {
  ORG_ADMIN,
  ORG_EDITOR,
  ORG_MEMBER_SETTINGS,
  TOOLTIP_EXTERNAL_ADMIN,
  TOOLTIP_ROLE,
} from './ProjectCollaborators.constants';
import { RoleDropdownProps } from './ProjectCollaborators.types';
import { ROLE_HIERARCHY, ROLE_OPTIONS } from './ProjectCollaborators.utils';

export const RoleDropdown = ({
  projectRole,
  orgRole,
  onChange,
  disabled = false,
  currentUserRole,
  isCurrentUser = false,
  isExternalAdmin = false,
}: RoleDropdownProps & {
  isExternalAdmin?: boolean;
}) => {
  const { _ } = useLingui();

  // Get unavailable roles function
  const getUnavailableRoles =
    (currentRole: string, orgRole?: string) => (key: string) => {
      if (currentRole === 'viewer' || orgRole === 'viewer') return false;
      if (orgRole === undefined || orgRole === null || orgRole === '')
        return false;

      const level = ROLE_HIERARCHY[key as ProjectRole];
      const isOrgAndProjectAdmin =
        orgRole === 'admin' && currentRole === 'admin';
      const isOrgAndProjectEditor =
        orgRole === 'editor' && currentRole === 'editor';
      const isOrgEditorProjectAdmin =
        orgRole === 'editor' && currentRole === 'admin';

      if (isOrgAndProjectAdmin) return key !== 'admin';
      if (isOrgAndProjectEditor) return key !== 'editor' && key !== 'admin';
      if (isOrgEditorProjectAdmin) return key !== 'admin' && key !== 'editor';
      if (orgRole === 'admin' && key !== 'admin') return true;

      return level > ROLE_HIERARCHY[orgRole as ProjectRole];
    };

  // Get tooltip conditions
  const getTooltipConditions = ({
    role,
    isExternalAdmin,
    orgRole,
    currentUserRole,
    isCurrentUser,
  }: {
    role: string;
    isExternalAdmin?: boolean;
    orgRole?: string;
    currentUserRole?: string;
    isCurrentUser?: boolean;
  }) => {
    const showExternalAdminTooltip =
      isExternalAdmin && role === 'admin' && orgRole !== '';
    const showNotAdminTooltip = currentUserRole !== 'admin';

    let tooltipTitle: string | undefined;
    if (showExternalAdminTooltip) {
      tooltipTitle = _(TOOLTIP_EXTERNAL_ADMIN);
    } else if (showNotAdminTooltip && isCurrentUser) {
      tooltipTitle = _(TOOLTIP_ROLE);
    }

    return {
      tooltipTitle,
      disabled: showExternalAdminTooltip || showNotAdminTooltip,
    };
  };

  // Render additional description for org roles
  const renderAdditionalDescription = (roleKey: string, orgRole?: string) => {
    const isOrgAdminAndProjectEditor =
      orgRole === 'admin' && projectRole === 'editor';
    const isOrgAndProjectAdmin = orgRole === 'admin' && projectRole === 'admin';

    if (
      (orgRole === 'editor' && roleKey === 'editor') ||
      (isOrgAdminAndProjectEditor && roleKey === 'admin')
    ) {
      return (
        <p className="text-[12px] leading-[1.45] font-bold italic text-left m-0 text-bc-neutral-500">
          {_(ORG_EDITOR)}{' '}
          <a
            href="/dashboard/members"
            className="underline decoration-0 text-bc-neutral-500 hover:text-bc-neutral-500"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'inherit',
            }}
          >
            {_(ORG_MEMBER_SETTINGS)}
          </a>
          .
        </p>
      );
    } else if (isOrgAndProjectAdmin && roleKey === 'admin') {
      return (
        <p className="text-[12px] leading-[1.45] font-bold italic text-left m-0 text-bc-neutral-500">
          {_(ORG_ADMIN)}{' '}
          <a
            href="/dashboard/members"
            className="underline decoration-0 text-bc-neutral-500 hover:text-bc-neutral-500"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'inherit',
            }}
          >
            {_(ORG_MEMBER_SETTINGS)}
          </a>
          .
        </p>
      );
    }
    return null;
  };

  return (
    <BaseRoleDropdown
      role={projectRole}
      disabled={disabled}
      onChange={onChange}
      isCurrentUser={isCurrentUser}
      roleOptions={ROLE_OPTIONS}
      getUnavailableRoles={getUnavailableRoles}
      orgRole={orgRole}
      currentUserRole={currentUserRole}
      isExternalAdmin={isExternalAdmin}
      renderAdditionalDescription={renderAdditionalDescription}
      getTooltipConditions={getTooltipConditions}
    />
  );
};
