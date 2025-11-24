import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Body, Title } from 'web-components/src/components/typography';

import { ROLE_VIEWER } from '../ActionDropdown/ActionDropdown.constants';
import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseMembersTable } from '../BaseMembersTable/BaseMembersTable';
import { PROJECT_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import { UserInfo } from '../BaseMembersTable/BaseMembersTable.UserInfo';
import { MIGRATE_PROJECT } from '../ProjectDashboardBanner/ProjectDashboardBanner.constants';
import {
  COLLABORATORS_DESCRIPTION,
  INVITE_COLLABORATORS,
  PROJECT_COLLABORATORS,
} from './ProjectCollaborators.constants';
import { RoleDropdown } from './ProjectCollaborators.RoleDropdown';
import { ProjectCollaboratorsProps } from './ProjectCollaborators.types';

export const ProjectCollaborators = ({
  collaborators,
  onInvite,
  onUpdateRole,
  onRemove,
  onToggleSort,
  sortDir,
  onEditOrgRole,
  isProjectDao,
  partOfOrganization,
  canMigrate,
  migrateProject,
  createOrganization,
}: ProjectCollaboratorsProps) => {
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
      {isProjectDao ? (
        (col, canAdmin) => (
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
            <div className="flex items-center order-10 lg:order-none w-full lg:w-[170px] px-6">
              <RoleDropdown
                onChange={r => onUpdateRole(col.id, r)}
                role={col.role}
                currentUserRole={currentUserRole}
                hasWalletAddress={col.hasWalletAddress}
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
        )
      ) : (
        <div className="text-center rounded-[10px] border border-solid border-sc-card-standard-stroke p-40 bg-sc-card-standard-header-background">
          <Title variant="h4" className="max-w-[614px] mx-auto">
            <Trans>
              Collaborator feature is for projects that are part of an
              organization
            </Trans>
          </Title>
          {!partOfOrganization && (
            <Body className="pt-10 text-bc-neutral-500 max-w-[614px] mx-auto">
              <Trans>
                You can create an organization and migrate your personal
                projects to it.
              </Trans>
            </Body>
          )}
          {partOfOrganization && migrateProject ? (
            canMigrate ? (
              <OutlinedButton
                onClick={canMigrate ? migrateProject : undefined}
                className="mt-25"
              >
                {_(MIGRATE_PROJECT)}
              </OutlinedButton>
            ) : (
              <InfoTooltip
                arrow
                placement="top"
                title={_(
                  msg`You must be an Owner, Admin or Editor of your organization to migrate a project.`,
                )}
              >
                <OutlinedButton disabled className="mt-25">
                  {_(MIGRATE_PROJECT)}
                </OutlinedButton>
              </InfoTooltip>
            )
          ) : (
            <OutlinedButton onClick={createOrganization} className="mt-25">
              <Trans>create an organization</Trans>
            </OutlinedButton>
          )}
        </div>
      )}
    </BaseMembersTable>
  );
};
