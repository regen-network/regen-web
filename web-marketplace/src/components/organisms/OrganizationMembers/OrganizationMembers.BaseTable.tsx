import { useMemo, useState } from 'react';
import { useLingui } from '@lingui/react';

import { UseStateSetter } from 'web-components/src/types/react/useState';

import {
  AccountsOrderBy,
  DaoByAddressQuery,
  GetAccountsByNameOrAddrQuery,
} from 'generated/graphql';

import { RoleTooltip } from '../../molecules/RoleTooltip/RoleTooltip';
import { ROLE_OWNER } from '../ActionDropdown/ActionDropdown.constants';
import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseMembersTable } from '../BaseMembersTable/BaseMembersTable';
import { ORGANIZATION_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import { Modals } from '../BaseMembersTable/BaseMembersTable.Modals';
import {
  BaseMemberRole,
  Member,
  MemberData,
} from '../BaseMembersTable/BaseMembersTable.types';
import { UserInfo } from '../BaseMembersTable/BaseMembersTable.UserInfo';
import { PersonalProfileSchemaType } from '../BaseMembersTable/modals/modals.schema';
import { BaseRoleDropdown } from '../BaseRoleDropdown/BaseRoleDropdown';
import {
  INVITE_MEMBERS,
  ORG_ROLES_DOCS_URL,
  ORGANIZATION_MEMBERS,
  ORGANIZATION_MEMBERS_DESCRIPTION,
  VISIBILITY_ON_PROFILE,
  VISIBILITY_TOOLTIP,
} from './OrganizationMembers.constants';
import { getRoleItems } from './OrganizationMembers.utils';
import { VisibilitySwitch } from './OrganizationMembers.VisibilitySwitch';

export type BaseProps = {
  members: Member[];
  sortDir?: AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc;
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: BaseMemberRole) => Promise<void>;
  onUpdateVisibility: (id: string, visible: boolean) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onAddMember: (data: MemberData<BaseMemberRole>) => Promise<void>;
  accounts?: GetAccountsByNameOrAddrQuery | null;
  setDebouncedValue: UseStateSetter<string>;
  onSaveProfile: (data: PersonalProfileSchemaType) => Promise<void>;
  onUpload: (imageFile: File) => Promise<{ url: string }>;
  daoWithAddress?: DaoByAddressQuery['daoByAddress'];
};

type VariantConfig = {
  showHeader: boolean;
  showDescription: boolean;
  showHelpDocs: boolean;
  showMobileInvite: boolean;
  limitActionsToInvited: boolean;
  showActionsColumnWhenInvited: boolean;
  hideOwnerOption?: boolean;
};

export type OrganizationMembersBaseProps = BaseProps & {
  variant: 'standard' | 'invite';
  config?: Partial<VariantConfig>;
};

const defaultConfig: Record<'standard' | 'invite', VariantConfig> = {
  standard: {
    showHeader: true,
    showDescription: true,
    showHelpDocs: true,
    showMobileInvite: true,
    limitActionsToInvited: false,
    showActionsColumnWhenInvited: false,
    hideOwnerOption: false,
  },
  invite: {
    showHeader: false,
    showDescription: false,
    showHelpDocs: false,
    showMobileInvite: false,
    limitActionsToInvited: true,
    showActionsColumnWhenInvited: true,
    hideOwnerOption: true,
  },
};

export const OrganizationMembersBase = ({
  members,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
  onAddMember,
  accounts,
  setDebouncedValue,
  variant,
  onSaveProfile,
  onUpload,
  config: overrideConfig = {},
  daoWithAddress,
}: OrganizationMembersBaseProps) => {
  const cfg: VariantConfig = { ...defaultConfig[variant], ...overrideConfig };
  const { _ } = useLingui();
  const currentMember = useMemo(
    () => members.find(m => m.isCurrentUser),
    [members],
  );
  const currentUserRole = currentMember?.role;

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [showPersonalProfileModal, setShowPersonalProfileModal] =
    useState(false);

  const hasInvited = members.some(m => !m.isCurrentUser);
  const showActionsColumn = cfg.showActionsColumnWhenInvited
    ? hasInvited
    : true;

  const roleOptions = getRoleItems(
    _,
    cfg.hideOwnerOption && currentUserRole !== ROLE_OWNER,
  );

  const roleTooltipContent = <RoleTooltip docsUrl={ORG_ROLES_DOCS_URL} />;

  const visibilityTooltipContent = _(VISIBILITY_TOOLTIP);

  return (
    <>
      <BaseMembersTable
        users={members}
        title={cfg.showHeader ? _(ORGANIZATION_MEMBERS) : ''}
        description={
          cfg.showDescription ? _(ORGANIZATION_MEMBERS_DESCRIPTION) : ''
        }
        inviteButtonText={_(INVITE_MEMBERS)}
        currentUserRole={currentUserRole}
        onInvite={() => {
          setShowInviteModal(true);
        }}
        onSort={onToggleSort}
        sortDir={sortDir}
        context={ORGANIZATION_CONTEXT}
        additionalColumns={[_(VISIBILITY_ON_PROFILE)]}
        additionalColumnTooltips={[visibilityTooltipContent]}
        roleTooltip={roleTooltipContent}
        showMobileInvite={cfg.showMobileInvite}
        hideHeader={!cfg.showHeader}
        hideDescription={!cfg.showDescription}
        hideHelpDocs={!cfg.showHelpDocs}
        showActionsColumn={showActionsColumn}
      >
        {(member, canAdmin) => (
          <>
            <UserInfo
              user={member}
              context={ORGANIZATION_CONTEXT}
              description={member.title}
              organization={member.organization}
              onEditPersonalProfile={() => {
                if (member.isCurrentUser) {
                  setShowPersonalProfileModal(true);
                }
              }}
            >
              {(!cfg.limitActionsToInvited || !member.isCurrentUser) && (
                <ActionsDropdown
                  role={member.role}
                  currentUserRole={currentUserRole}
                  isCurrentUser={!!member.isCurrentUser}
                  onRemove={() => {
                    setMemberToRemove(member.id);
                    setShowRemoveModal(true);
                  }}
                  context={ORGANIZATION_CONTEXT}
                />
              )}
            </UserInfo>

            {/* Mobile controls */}
            <div className="flex gap-20 xl:hidden w-full px-6 justify-between items-center">
              <BaseRoleDropdown
                role={member.role}
                disabled={!canAdmin}
                onChange={r => onUpdateRole(member.id, r)}
                currentUserRole={currentUserRole}
                hasWalletAddress={member.hasWalletAddress}
                roleOptions={roleOptions}
              />
              <VisibilitySwitch
                checked={member.visible}
                disabled={!canAdmin}
                isCurrentUser={member.isCurrentUser}
                onChange={v => onUpdateVisibility(member.id, v)}
              />
            </div>

            {/* Desktop role */}
            <div className="hidden xl:flex w-[170px] items-center">
              <BaseRoleDropdown
                role={member.role}
                disabled={!canAdmin}
                onChange={r => onUpdateRole(member.id, r)}
                currentUserRole={currentUserRole}
                hasWalletAddress={member.hasWalletAddress}
                roleOptions={roleOptions}
              />
            </div>
            {/* Desktop visibility */}
            <div className="hidden xl:flex w-[180px] justify-center items-center">
              <VisibilitySwitch
                checked={member.visible}
                disabled={!canAdmin}
                isCurrentUser={member.isCurrentUser}
                onChange={v => onUpdateVisibility(member.id, v)}
              />
            </div>
            {/* Desktop actions */}
            {showActionsColumn && (
              <div className="hidden xl:flex w-[60px] h-[74px] justify-center items-center">
                {(!cfg.limitActionsToInvited || !member.isCurrentUser) && (
                  <ActionsDropdown
                    role={member.role}
                    currentUserRole={currentUserRole}
                    isCurrentUser={!!member.isCurrentUser}
                    onRemove={() => {
                      setMemberToRemove(member.id);
                      setShowRemoveModal(true);
                    }}
                    context={ORGANIZATION_CONTEXT}
                  />
                )}
              </div>
            )}
          </>
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
          onSaveProfile={onSaveProfile}
          onUpload={onUpload}
          accounts={accounts}
          setDebouncedValue={setDebouncedValue}
          daoWithAddress={daoWithAddress}
          currentMember={currentMember}
          roleOptions={roleOptions}
        />
      )}
    </>
  );
};
