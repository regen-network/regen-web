import { useState } from 'react';
import { useLingui } from '@lingui/react';

import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseTable, UserInfo } from '../BaseTable/BaseTable';
import {
  COLLABORATORS_DESCRIPTION,
  INVITE_COLLABORATORS,
  PROJECT_COLLABORATORS,
} from './Collaborators.constants';
import {
  CollaboratorsManagementProps,
  ProjectRoleType,
} from './Collaborators.types';
import { RoleDropdown } from './RoleDropdown';

export const CollaboratorsManagement: React.FC<CollaboratorsManagementProps> =
  ({ collaborators, onInvite, onRoleChange, onRemove }) => {
    const { _ } = useLingui();

    const [localCollaborators, setLocalCollaborators] = useState(
      collaborators || [],
    );
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const currentUserRole =
      localCollaborators?.find(c => c.isCurrentUser)?.projectRole || 'viewer';
    const isExternalAdmin = collaborators?.some(
      c => c.orgRole === '' && c.projectRole === 'admin' && c.isCurrentUser,
    );

    const adminCount = localCollaborators?.filter(
      c => c.projectRole === 'admin',
    ).length;

    /* ───── sort handler ───── */
    const toggleSort = () => {
      const dir = sortDir === 'asc' ? 'desc' : 'asc';
      setSortDir(dir);
      setLocalCollaborators(prev =>
        [...(prev ?? [])].sort((a, b) =>
          dir === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name),
        ),
      );
    };

    /* ───── role / remove handlers ───── */
    const handleRoleChange = (id: string, role: ProjectRoleType) => {
      setLocalCollaborators(prev =>
        prev?.map(c => (c.id === id ? { ...c, projectRole: role } : c)),
      );
      onRoleChange?.(id, role);
    };
    const handleRemove = (id: string) => {
      setLocalCollaborators(prev => prev?.filter(c => c.id !== id));
      onRemove?.(id);
    };

    return (
      <BaseTable
        users={localCollaborators}
        title={_(PROJECT_COLLABORATORS)}
        description={_(COLLABORATORS_DESCRIPTION)}
        inviteButtonText={_(INVITE_COLLABORATORS)}
        canAdmin={currentUserRole === 'admin'}
        onInvite={onInvite}
        onSort={toggleSort}
        sortDir={sortDir}
        context="collaborators"
        showMobileInvite={true}
      >
        {col => {
          const isOnlyAdmin = adminCount === 1 && col.projectRole === 'admin';
          return (
            <>
              {/* Avatar / info + mobile dots */}
              <UserInfo
                user={col}
                context="collaborators"
                description={col.description}
                organization={col.organization}
              >
                <ActionsDropdown
                  role={col.projectRole}
                  currentUserRole={currentUserRole}
                  orgRole={col.orgRole}
                  isCurrentUser={col.isCurrentUser}
                  onRemove={() => handleRemove(col.id)}
                  onEditOrgRole={() => {}}
                  onEditTitle={() => {}}
                  isExternalAdmin={isExternalAdmin}
                />
              </UserInfo>

              {/* Role dropdown – full width on mobile */}
              <div className="order-10 lg:order-none w-full lg:w-[170px] px-6">
                <RoleDropdown
                  projectRole={col.projectRole}
                  orgRole={col.orgRole}
                  currentUserRole={currentUserRole}
                  onChange={r => handleRoleChange(col.id, r)}
                  isCurrentUser={col.isCurrentUser}
                  isExternalAdmin={isExternalAdmin}
                  isOnlyAdmin={isOnlyAdmin}
                />
              </div>

              {/* dots for desktop */}
              <div className="hidden lg:flex w-[60px] justify-center items-center">
                <ActionsDropdown
                  role={col.projectRole}
                  currentUserRole={currentUserRole}
                  orgRole={col.orgRole}
                  isCurrentUser={col.isCurrentUser}
                  onRemove={() => handleRemove(col.id)}
                  onEditOrgRole={() => {}}
                  onEditTitle={() => {}}
                  isExternalAdmin={isExternalAdmin}
                />
              </div>
            </>
          );
        }}
      </BaseTable>
    );
  };
