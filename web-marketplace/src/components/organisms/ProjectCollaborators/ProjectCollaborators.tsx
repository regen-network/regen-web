import { useMemo, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import InfoTooltip from 'web-components/src/components/tooltip/InfoTooltip';
import { Body, Title } from 'web-components/src/components/typography';

import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseMembersTable } from '../BaseMembersTable/BaseMembersTable';
import { PROJECT_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import { Modals } from '../BaseMembersTable/BaseMembersTable.Modals';
import { UserInfo } from '../BaseMembersTable/BaseMembersTable.UserInfo';
import { useInviteMember } from '../BaseMembersTable/modals/hooks/useInviteMember';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import { MIGRATE_PROJECT } from '../ProjectDashboardBanner/ProjectDashboardBanner.constants';
import {
  COLLABORATORS_DESCRIPTION,
  INVITE_COLLABORATORS,
  PROJECT_COLLABORATORS,
} from './ProjectCollaborators.constants';
import { ProjectCollaboratorsProps } from './ProjectCollaborators.types';
import { getRoleItems } from './ProjectCollaborators.utils';

export const ProjectCollaborators = ({
  collaborators,
  onAddMember,
  onUpdateRole,
  onRemove,
  onToggleSort,
  sortDir,
  onEditOrgRole,
  isProjectDao,
  partOfOrganization,
  canMigrate,
  migrateProject,
  offChainId,
  createOrganization,
}: ProjectCollaboratorsProps) => {
  const { _ } = useLingui();
  const currentMember = useMemo(
    () => collaborators.find(m => m.isCurrentUser),
    [collaborators],
  );
  const currentUserRole = currentMember?.role;

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [showPersonalProfileModal, setShowPersonalProfileModal] =
    useState(false);

  const { setDebouncedValue, accounts, daoData, saveProfile, onUpload } =
    useInviteMember();

  const roleOptions = getRoleItems(_);

  return (
    <>
      <BaseMembersTable
        users={collaborators}
        title={_(PROJECT_COLLABORATORS)}
        description={_(COLLABORATORS_DESCRIPTION)}
        inviteButtonText={_(INVITE_COLLABORATORS)}
        currentUserRole={currentUserRole}
        onInvite={() => {
          setShowInviteModal(true);
        }}
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
                description={col.title}
                organization={col.organization}
                onEditPersonalProfile={() => {
                  if (col.isCurrentUser) {
                    setShowPersonalProfileModal(true);
                  }
                }}
              >
                <ActionsDropdown
                  role={col.role}
                  currentUserRole={currentUserRole}
                  isCurrentUser={col.isCurrentUser}
                  onRemove={() => {
                    setMemberToRemove(col.id);
                    setShowRemoveModal(true);
                  }}
                  onEditOrgRole={onEditOrgRole}
                  canEditOrgRole={col.canEditOrgRole}
                />
              </UserInfo>

              {/* Role dropdown – full width on mobile */}
              <div className="flex items-center order-10 lg:order-none w-full lg:w-[170px] px-6">
                <BaseRoleDropdown
                  onChange={r => onUpdateRole(col.id, r)}
                  role={col.role}
                  currentUserRole={currentUserRole}
                  hasWalletAddress={col.hasWalletAddress}
                  disabled={!canAdmin}
                  roleOptions={roleOptions}
                />
              </div>

              {/* dots for desktop */}
              <div className="hidden lg:flex w-[60px] justify-center items-center">
                <ActionsDropdown
                  role={col.role}
                  currentUserRole={currentUserRole}
                  isCurrentUser={col.isCurrentUser}
                  onRemove={() => {
                    setMemberToRemove(col.id);
                    setShowRemoveModal(true);
                  }}
                  onEditOrgRole={onEditOrgRole}
                  canEditOrgRole={col.canEditOrgRole}
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
            {partOfOrganization ? (
              canMigrate && offChainId ? (
                <OutlinedButton onClick={migrateProject} className="mt-25">
                  {_(MIGRATE_PROJECT)}
                </OutlinedButton>
              ) : (
                <InfoTooltip
                  arrow
                  placement="top"
                  title={_(
                    offChainId
                      ? msg`You must be an Owner, Admin or Editor of your organization to migrate a project.`
                      : msg`Offchain project id is needed to migrate a project. Edit project description or media to create one.`,
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
      {currentMember && (
        <Modals
          showInviteModal={showInviteModal}
          setShowInviteModal={setShowInviteModal}
          showRemoveModal={showRemoveModal}
          setShowRemoveModal={setShowRemoveModal}
          showPersonalProfileModal={showPersonalProfileModal}
          setShowPersonalProfileModal={setShowPersonalProfileModal}
          memberToRemove={memberToRemove}
          setMemberToRemove={setMemberToRemove}
          onAddMember={onAddMember}
          onRemove={onRemove}
          onSaveProfile={saveProfile}
          onUpload={onUpload}
          accounts={accounts}
          setDebouncedValue={setDebouncedValue}
          daoWithAddress={daoData?.daoByAddress}
          currentMember={currentMember}
          roleOptions={roleOptions}
          isOrg={false}
        />
      )}
    </>
  );
};
