import { useState } from 'react';
import { useLingui } from '@lingui/react';
import { useAtom } from 'jotai';

import Banner from 'web-components/src/components/banner';

import { bannerTextAtom } from 'lib/atoms/banner.atoms';

import { ROLE_VIEWER } from '../ActionDropdown/ActionDropdown.constants';
import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseMembersTable } from '../BaseMembersTable/BaseMembersTable';
import { ORGANIZATION_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import { UserInfo } from '../BaseMembersTable/BaseMembersTable.UserInfo';
import { InviteMemberModal } from './InviteMembers/InviteMembers.InviteModal';
import { PersonalProfileModal } from './InviteMembers/InviteMembers.ProfileModal';
import {
  INVITE_MEMBERS,
  MEMBER_REMOVED_BANNER,
  ORGANIZATION_MEMBERS,
  ORGANIZATION_MEMBERS_DESCRIPTION,
  VISIBILITY_ON_PROFILE,
} from './OrganizationMembers.constants';
import { MemberRoleDropdown } from './OrganizationMembers.RoleDropdown';
import { Member } from './OrganizationMembers.types';
import { VisibilitySwitch } from './OrganizationMembers.VisibilitySwitch';
import { RemoveMemberModal } from './OrginazationMembers.RemoveMemberModal';

type BaseProps = {
  members: Member[];
  sortDir?: 'asc' | 'desc';
  onToggleSort: () => void;
  onInvite: () => void;
  onUpdateRole: (id: string, role: BaseMemberRole) => void;
  onUpdateVisibility: (id: string, visible: boolean) => void;
  onRemove: (id: string) => void;
  onAddMember?: (data: {
    role: BaseMemberRole | undefined;
    addressOrEmail: string;
    visible: boolean;
  }) => void;
  accounts?: any;
  setDebouncedValue?: (value: string) => void;
};

type VariantConfig = {
  showHeader: boolean;
  showDescription: boolean;
  showHelpDocs: boolean;
  showMobileInvite: boolean;
  enableInviteModal: boolean;
  enableRemoveModal: boolean;
  enableProfileEdit: boolean;
  limitActionsToInvited: boolean;
  showActionsColumnWhenInvited: boolean;
  disableRoleEditForCurrentUser: boolean;
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
    enableInviteModal: true,
    enableRemoveModal: true,
    enableProfileEdit: false,
    limitActionsToInvited: false,
    showActionsColumnWhenInvited: false,
    disableRoleEditForCurrentUser: false,
  },
  invite: {
    showHeader: false,
    showDescription: false,
    showHelpDocs: false,
    showMobileInvite: false,
    enableInviteModal: true,
    enableRemoveModal: true,
    enableProfileEdit: true,
    limitActionsToInvited: true,
    showActionsColumnWhenInvited: true,
    disableRoleEditForCurrentUser: true,
  },
};

export const OrganizationMembersBase = ({
  members,
  sortDir,
  onToggleSort,
  onInvite,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
  onAddMember,
  accounts,
  setDebouncedValue,
  variant,
  config: overrideConfig = {},
}: OrganizationMembersBaseProps) => {
  const cfg: VariantConfig = { ...defaultConfig[variant], ...overrideConfig };
  const { _ } = useLingui();
  const currentUserRole: BaseMemberRole =
    members.find(member => member.isCurrentUser)?.role ?? ROLE_VIEWER;

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [showPersonalProfileModal, setShowPersonalProfileModal] =
    useState(false);
  const [bannerText, setBannerText] = useAtom(bannerTextAtom);

  const hasInvited = members.some(m => m.invited && !m.isCurrentUser);
  const showActionsColumn = cfg.showActionsColumnWhenInvited
    ? hasInvited
    : true;

  return (
    <>
      {bannerText && cfg.enableRemoveModal && (
        <Banner
          text={bannerText}
          className="bg-bc-red-400"
          onClose={() => setBannerText('')}
        />
      )}
      <BaseMembersTable
        users={members}
        title={cfg.showHeader ? _(ORGANIZATION_MEMBERS) : ''}
        description={
          cfg.showDescription ? _(ORGANIZATION_MEMBERS_DESCRIPTION) : ''
        }
        inviteButtonText={_(INVITE_MEMBERS)}
        currentUserRole={currentUserRole}
        onInvite={() => {
          if (cfg.enableInviteModal) setShowInviteModal(true);
          onInvite();
        }}
        onSort={onToggleSort}
        sortDir={sortDir}
        context={ORGANIZATION_CONTEXT}
        additionalColumns={[_(VISIBILITY_ON_PROFILE)]}
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
                if (
                  cfg.enableProfileEdit &&
                  member.isCurrentUser &&
                  cfg.enableInviteModal
                ) {
                  setShowPersonalProfileModal(true);
                }
              }}
            >
              {(!cfg.limitActionsToInvited ||
                (member.invited && !member.isCurrentUser)) && (
                <ActionsDropdown
                  role={member.role}
                  currentUserRole={currentUserRole}
                  isCurrentUser={!!member.isCurrentUser}
                  onRemove={() => {
                    if (cfg.enableRemoveModal) {
                      setMemberToRemove(member.id);
                      setShowRemoveModal(true);
                    } else {
                      onRemove(member.id);
                    }
                  }}
                  context={ORGANIZATION_CONTEXT}
                />
              )}
            </UserInfo>

            {/* Mobile controls */}
            <div className="flex gap-20 xl:hidden w-full px-6 justify-between items-center">
              <MemberRoleDropdown
                role={member.role}
                disabled={
                  !canAdmin ||
                  (cfg.disableRoleEditForCurrentUser && member.isCurrentUser)
                }
                hasWalletAddress={member.hasWalletAddress}
                onChange={r => onUpdateRole(member.id, r)}
                currentUserRole={currentUserRole}
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
              <MemberRoleDropdown
                role={member.role}
                disabled={
                  !canAdmin ||
                  (cfg.disableRoleEditForCurrentUser && member.isCurrentUser)
                }
                hasWalletAddress={member.hasWalletAddress}
                onChange={r => onUpdateRole(member.id, r)}
                currentUserRole={currentUserRole}
              />
            </div>
            {/* Desktop visibility */}
            <div className="hidden xl:flex w-[150px] items-center">
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
                {(!cfg.limitActionsToInvited ||
                  (member.invited && !member.isCurrentUser)) && (
                  <ActionsDropdown
                    role={member.role}
                    currentUserRole={currentUserRole}
                    isCurrentUser={!!member.isCurrentUser}
                    onRemove={() => {
                      if (cfg.enableRemoveModal) {
                        setMemberToRemove(member.id);
                        setShowRemoveModal(true);
                      } else {
                        onRemove(member.id);
                      }
                    }}
                    context={ORGANIZATION_CONTEXT}
                  />
                )}
              </div>
            )}
          </>
        )}
      </BaseMembersTable>
      {cfg.enableInviteModal && (
        <InviteMemberModal
          open={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onSubmit={data => {
            if (onAddMember) onAddMember(data);
            setShowInviteModal(false);
          }}
          accounts={accounts}
          setDebouncedValue={setDebouncedValue}
        />
      )}
      {cfg.enableRemoveModal && (
        <RemoveMemberModal
          open={showRemoveModal}
          onClose={() => {
            setShowRemoveModal(false);
            setMemberToRemove(null);
          }}
          onConfirm={() => {
            if (memberToRemove) {
              onRemove(memberToRemove);
              setBannerText(_(MEMBER_REMOVED_BANNER));
            }
            setShowRemoveModal(false);
            setMemberToRemove(null);
          }}
        />
      )}
      {cfg.enableProfileEdit && cfg.enableInviteModal && (
        <PersonalProfileModal
          open={showPersonalProfileModal}
          onClose={() => setShowPersonalProfileModal(false)}
          initialName={members.find(m => m.isCurrentUser)?.name || ''}
          initialAvatar={members.find(m => m.isCurrentUser)?.avatar}
          initialDescription={undefined}
          initialTitle={members.find(m => m.isCurrentUser)?.title}
          onSave={() => setShowPersonalProfileModal(false)}
        />
      )}
    </>
  );
};
