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
import { InviteMemberModal } from './InviteMemberModal';
import {
  INVITE_MEMBERS,
  MEMBER_REMOVED_BANNER,
  VISIBILITY_ON_PROFILE,
} from './OrganizationMembers.constants';
import { MemberRoleDropdown } from './OrganizationMembers.RoleDropdown';
import { Member } from './OrganizationMembers.types';
import { VisibilitySwitch } from './OrganizationMembers.VisibilitySwitch';
import { PersonalProfileModal } from './PersonalProfileModal';
import { RemoveMemberModal } from './RemoveMemberModal';

type Props = {
  members: Member[];
  onInvite: () => void;
  sortDir?: 'asc' | 'desc';
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: BaseMemberRole) => void;
  onUpdateVisibility: (id: string, visible: boolean) => void;
  onRemove: (id: string) => void;
};

export const OrganizationMembersInviteTable = ({
  members,
  onInvite,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
}: Props) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null);
  const [bannerText, setBannerText] = useAtom(bannerTextAtom);
  const [showPersonalProfileModal, setShowPersonalProfileModal] =
    useState(false);
  const { _ } = useLingui();
  const currentUserRole: BaseMemberRole =
    members.find(member => member.isCurrentUser)?.role ?? ROLE_VIEWER;
  const hasInvited = members.some(m => m.invited && !m.isCurrentUser);

  return (
    <>
      {bannerText && (
        <Banner
          text={bannerText}
          className="bg-bc-red-400"
          onClose={() => setBannerText('')}
        />
      )}
      <BaseMembersTable
        users={members}
        title=""
        description=""
        inviteButtonText={_(INVITE_MEMBERS)}
        currentUserRole={currentUserRole}
        onInvite={() => {
          setShowInviteModal(true);
          onInvite();
        }}
        onSort={onToggleSort}
        sortDir={sortDir}
        context={ORGANIZATION_CONTEXT}
        additionalColumns={[_(VISIBILITY_ON_PROFILE)]}
        showMobileInvite={false}
        hideHeader={true}
        hideDescription={true}
        hideHelpDocs={true}
        showActionsColumn={hasInvited}
      >
        {(member, canAdmin) => (
          <>
            {/* Info without mobile dots */}
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
              {member.invited && !member.isCurrentUser && (
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

            {/* Mobile row: dropdown + switch */}
            <div className="flex gap-20 xl:hidden w-full px-6 justify-between items-center">
              <MemberRoleDropdown
                role={member.role}
                disabled={!canAdmin}
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

            {/* Desktop columns */}
            <div className="hidden xl:flex w-[170px] items-center">
              <MemberRoleDropdown
                role={member.role}
                disabled={!canAdmin}
                hasWalletAddress={member.hasWalletAddress}
                onChange={r => onUpdateRole(member.id, r)}
                currentUserRole={currentUserRole}
              />
            </div>
            <div className="hidden xl:flex w-[150px] items-center">
              <VisibilitySwitch
                checked={member.visible}
                disabled={!canAdmin}
                isCurrentUser={member.isCurrentUser}
                onChange={v => onUpdateVisibility(member.id, v)}
              />
            </div>
            {hasInvited && (
              <div className="hidden xl:flex w-[60px] h-[74px] justify-center items-center">
                {member.invited && !member.isCurrentUser && (
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
      <InviteMemberModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={() => setShowInviteModal(false)}
      />
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
      <PersonalProfileModal
        open={showPersonalProfileModal}
        onClose={() => setShowPersonalProfileModal(false)}
        initialName={members.find(m => m.isCurrentUser)?.name || ''}
        initialAvatar={members.find(m => m.isCurrentUser)?.avatar}
        initialDescription={undefined}
        initialTitle={members.find(m => m.isCurrentUser)?.title}
        onSave={() => setShowPersonalProfileModal(false)}
      />
    </>
  );
};
