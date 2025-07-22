import { useState } from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DropdownIcon from 'web-components/src/components/icons/DropdownIcon';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import { Title } from 'web-components/src/components/typography';

import { CollaboratorActionsDropdown } from './CollaboratorActionsDropdown';
import { YOU } from './Collaborators.constants';
import {
  CollaboratorsManagementProps,
  ProjectRoleType,
} from './Collaborators.types';
import { mockCollaborators } from './Collaborators.utils';
import { RoleDropdown } from './RoleDropdown';

export const CollaboratorsManagement: React.FC<CollaboratorsManagementProps> =
  ({ collaborators = mockCollaborators, onInvite, onRoleChange, onRemove }) => {
    const { _ } = useLingui();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [openRoleId, setOpenRoleId] = useState<string | null>(null);
    const [localCollaborators, setLocalCollaborators] = useState(collaborators);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const isExternalAdmin = collaborators.some(
      c => c.orgRole === '' && c.projectRole === 'admin' && c.isCurrentUser,
    );
    const currentUserRole =
      collaborators.find(c => c.isCurrentUser)?.projectRole || 'viewer';

    const handleSort = () => {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);

      const sorted = [...localCollaborators].sort((a, b) => {
        if (newDirection === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });

      setLocalCollaborators(sorted);
    };

    const handleRoleChange = (
      collaboratorId: string,
      newRole: ProjectRoleType,
    ) => {
      const updated = localCollaborators.map(c =>
        c.id === collaboratorId ? { ...c, projectRole: newRole } : c,
      );
      setLocalCollaborators(updated);
      onRoleChange?.(collaboratorId, newRole);
      setOpenMenuId(null);
    };

    const handleRemove = (collaboratorId: string) => {
      onRemove?.(collaboratorId);
      setOpenMenuId(null);
    };

    const handleEditOrgRole = (collaboratorId: string) => {};

    const handleEditTitle = (collaboratorId: string) => {};

    return (
      <div className="w-full border border-bc-neutral-300">
        {/* Header section with title and invite button */}
        <div className="flex justify-between items-center mb-10">
          <Title variant="h4">
            {_(msg`Project Collaborators`)}{' '}
            <span className="text-bc-neutral-400 font-normal">
              ({collaborators.length})
            </span>
          </Title>
          {currentUserRole === 'admin' && (
            <ContainedButton
              className="w-[269px] h-[42px] text-[14px]"
              onClick={onInvite}
              startIcon={<EmailIcon />}
            >
              {_(msg`Invite Collaborators`)}
            </ContainedButton>
          )}
        </div>

        {/* Subtitle / description */}
        <p className="text-sc-text-paragraph mb-30 mt-0">
          {_(
            msg`Collaborators can manage the project page, posts, and credits, but aren’t visible publicly.`,
          )}
        </p>

        {/* Collaborators table */}
        <div className="w-full">
          {/* Table header with sortable name column */}
          <div className="flex pb-20 justify-between font-muli text-sc-text-sub-header font-bold text-[12px]">
            <div
              className="w-[300px] px-6 flex items-center cursor-pointer "
              onClick={handleSort}
            >
              {_(msg`NAME`)}
              <DropdownIcon
                className={`ml-10 w-4 h-4 transition-transform ${
                  sortDirection === 'desc' ? 'transform rotate-180' : ''
                }`}
              />
            </div>
            <div className="w-[150px] text-left">{_(msg`ROLE`)}</div>
            <div className="w-[60px]"></div>
          </div>

          {/* Rows container */}
          <div className="flex flex-col gap-20">
            {localCollaborators.map(collaborator => (
              <div
                key={collaborator.id}
                className="flex py-20 justify-between items-center"
                style={{
                  borderTop: '1px solid var(--surface-stroke, #D2D5D9)',
                }}
              >
                {/* User info - left aligned */}
                <div className="flex items-center w-[300px] px-6 gap-10">
                  <div className="w-40 h-40 rounded-full bg-gray-200 mr-3 overflow-hidden">
                    {collaborator.avatar && (
                      <img
                        src={collaborator.avatar}
                        alt={collaborator.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-flex-start gap-5 flex-[1_0_0]">
                    <div className="font-bold flex items-center flex-row gap-3">
                      {collaborator.name}
                      {collaborator.isCurrentUser && (
                        <span className="text-gray-400 ml-2 flex items-center flex-row gap-5">
                          {_(YOU)}
                          <a
                            href={`/dashboard/profile`}
                            className="ml-1 p-0 bg-transparent border-none cursor-pointer"
                            aria-label="Edit your profile"
                          >
                            <EditIcon sx={{ height: '16px', width: '16px' }} />
                          </a>
                        </span>
                      )}
                    </div>
                    <div className="text-bc-neutral-700 text-sm">
                      {collaborator.description}
                      {collaborator.description && collaborator.organization
                        ? ', '
                        : ''}
                      {collaborator.organization}
                    </div>
                    <div className="text-bc-neutral-400 text-sm">
                      {collaborator.email}
                    </div>
                  </div>
                </div>

                {/* Role dropdown - right aligned with actions */}
                <div className="w-[150px] flex justify-start items-center relative">
                  <RoleDropdown
                    projectRole={collaborator.projectRole}
                    orgRole={collaborator.orgRole}
                    currentUserRole={currentUserRole}
                    onChange={newRole =>
                      handleRoleChange(collaborator.id, newRole)
                    }
                    isCurrentUser={collaborator.isCurrentUser}
                  />
                </div>

                {/* Menu */}
                <div className="w-[60px] flex justify-center items-center">
                  <CollaboratorActionsDropdown
                    role={collaborator.projectRole}
                    currentUserRole={currentUserRole}
                    orgRole={collaborator.orgRole}
                    isCurrentUser={collaborator.isCurrentUser}
                    onRemove={() => handleRemove(collaborator.id)}
                    onEditOrgRole={() => handleEditOrgRole(collaborator.id)}
                    onEditTitle={() => handleEditTitle(collaborator.id)}
                    isExternalAdmin={isExternalAdmin}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
