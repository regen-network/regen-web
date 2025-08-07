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
  onRoleChange,
  onRemove,
}) => {
  const { _ } = useLingui();

  const [localCollaborators, setLocalCollaborators] = useState(
    collaborators || [],
  );
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const currentUserRole =
    localCollaborators?.find(c => c.isCurrentUser)?.role || ROLE_VIEWER;

  /* ───── sort handler ───── */
  const toggleSort = useCallback(() => {
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    setSortDir(dir);
    setLocalCollaborators(prev =>
      [...(prev ?? [])].sort((a, b) =>
        dir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
  }, [sortDir]);

  /* ───── role / remove handlers ───── */
  const handleRoleChange = useCallback(
    (id: string, role: ProjectRole) => {
      setLocalCollaborators(prev =>
        prev?.map(c => (c.id === id ? { ...c, role: role } : c)),
      );
      onRoleChange?.(id, role);
    },
    [onRoleChange],
  );
  const handleRemove = useCallback(
    (id: string) => {
      setLocalCollaborators(prev => prev?.filter(c => c.id !== id));
      onRemove?.(id);
    },
    [onRemove],
  );

  return (
    <BaseMembersTable
      users={localCollaborators}
      title={_(PROJECT_COLLABORATORS)}
      description={_(COLLABORATORS_DESCRIPTION)}
      inviteButtonText={_(INVITE_COLLABORATORS)}
      currentUserRole={currentUserRole}
      onInvite={onInvite}
      onSort={toggleSort}
      sortDir={sortDir}
      context={PROJECT_CONTEXT}
      showMobileInvite={true}
    >
      {col => (
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
              onRemove={() => handleRemove(col.id)}
              onEditOrgRole={() => {}}
              onEditTitle={() => {}}
            />
          </UserInfo>

          {/* Role dropdown – full width on mobile */}
          <div className="order-10 lg:order-none w-full lg:w-[170px] px-6">
            <RoleDropdown
              role={col.role}
              currentUserRole={currentUserRole}
              onChange={r => handleRoleChange(col.id, r)}
              isCurrentUser={col.isCurrentUser}
            />
          </div>

          {/* dots for desktop */}
          <div className="hidden lg:flex w-[60px] justify-center items-center">
            <ActionsDropdown
              role={col.role}
              currentUserRole={currentUserRole}
              isCurrentUser={col.isCurrentUser}
              onRemove={() => handleRemove(col.id)}
              onEditOrgRole={() => {}}
              onEditTitle={() => {}}
            />
          </div>
        </>
      )}
    </BaseMembersTable>
  );
};
