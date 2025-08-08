import { useCallback, useState } from 'react';
import { useLingui } from '@lingui/react';

import { ROLE_VIEWER } from '../ActionDropdown/ActionDropdown.constants';
import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseMembersTable } from '../BaseMembersTable/BaseMembersTable';
import { PROJECT_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import { ProjectRole } from '../BaseMembersTable/BaseMembersTable.types';
import { UserInfo } from '../BaseMembersTable/BaseMembersTable.UserInfo';
import {
  COLLABORATORS_DESCRIPTION,
  INVITE_COLLABORATORS,
  PROJECT_COLLABORATORS,
} from './ProjectCollaborators.constants';
import { RoleDropdown } from './ProjectCollaborators.RoleDropdown';
import { ProjectCollaboratorsProps } from './ProjectCollaborators.types';

export const ProjectCollaborators: React.FC<ProjectCollaboratorsProps> = ({
  collaborators,
  onInvite,
  onUpdateRole,
  onRemove,
  onToggleSort,
  sortDir,
  onEditOrgRole,
}) => {
  const { _ } = useLingui();

  const currentUserRole =
    collaborators?.find(c => c.isCurrentUser)?.role || ROLE_VIEWER;

  return (
    <BaseMembersTable
      users={collaborators}
      title={_(PROJECT_COLLABORATORS)}
      description={_(COLLABORATORS_DESCRIPTION)}
      inviteButtonText={_(INVITE_COLLABORATORS)}
      currentUserRole={currentUserRole}
      onInvite={onInvite}
      onSort={onToggleSort}
      sortDir={sortDir}
      context={PROJECT_CONTEXT}
      showMobileInvite={true}
    >
      {(col, canAdmin) => (
        <>
          {/* Avatar / info + mobile dots */}
          <UserInfo
            user={col}
            context={PROJECT_CONTEXT}
            description={col.description}
            organization={col.organization}
          >
            <ActionsDropdown
              role={col.role}
              currentUserRole={currentUserRole}
              isCurrentUser={col.isCurrentUser}
              onRemove={() => onRemove(col.id)}
              onEditOrgRole={onEditOrgRole}
            />
          </UserInfo>

          {/* Role dropdown – full width on mobile */}
          <div className="order-10 lg:order-none w-full lg:w-[170px] px-6">
            <RoleDropdown
              onChange={r => onUpdateRole(col.id, r)}
              role={col.role}
              currentUserRole={currentUserRole}
              isCurrentUser={col.isCurrentUser}
              disabled={!canAdmin}
            />
          </div>

          {/* dots for desktop */}
          <div className="hidden lg:flex w-[60px] justify-center items-center">
            <ActionsDropdown
              role={col.role}
              currentUserRole={currentUserRole}
              isCurrentUser={col.isCurrentUser}
              onRemove={() => onRemove(col.id)}
              onEditOrgRole={onEditOrgRole}
            />
          </div>
        </>
      )}
    </BaseMembersTable>
  );
};
