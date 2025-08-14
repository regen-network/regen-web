import { useLingui } from '@lingui/react';

import { ROLE_VIEWER } from '../ActionDropdown/ActionDropdown.constants';
import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseMembersTable } from '../BaseMembersTable/BaseMembersTable';
import { ORGANIZATION_CONTEXT } from '../BaseMembersTable/BaseMembersTable.constants';
import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import { UserInfo } from '../BaseMembersTable/BaseMembersTable.UserInfo';
import {
  INVITE_MEMBERS,
  ORGANIZATION_MEMBERS,
  ORGANIZATION_MEMBERS_DESCRIPTION,
  VISIBILITY_ON_PROFILE,
} from './OrganizationMembers.constants';
import { MemberRoleDropdown } from './OrganizationMembers.RoleDropdown';
import { Member } from './OrganizationMembers.types';
import { VisibilitySwitch } from './OrganizationMembers.VisibilitySwitch';

type Props = {
  members: Member[];
  onInvite: () => void;
  sortDir?: 'asc' | 'desc';
  onToggleSort: () => void;
  onUpdateRole: (id: string, role: BaseMemberRole) => void;
  onUpdateVisibility: (id: string, visible: boolean) => void;
  onRemove: (id: string) => void;
};
export const OrganizationMembers = ({
  members,
  onInvite,
  sortDir,
  onToggleSort,
  onUpdateRole,
  onUpdateVisibility,
  onRemove,
}: Props) => {
  const { _ } = useLingui();
  const currentUserRole: BaseMemberRole =
    members.find(member => member.isCurrentUser)?.role ?? ROLE_VIEWER;

  return (
    <BaseMembersTable
      users={members}
      title={_(ORGANIZATION_MEMBERS)}
      description={_(ORGANIZATION_MEMBERS_DESCRIPTION)}
      inviteButtonText={_(INVITE_MEMBERS)}
      currentUserRole={currentUserRole}
      onInvite={onInvite}
      onSort={onToggleSort}
      sortDir={sortDir}
      context={ORGANIZATION_CONTEXT}
      additionalColumns={[_(VISIBILITY_ON_PROFILE)]}
      showMobileInvite={true}
    >
      {(member, canAdmin) => (
        <>
          {/* Info + mobile dots */}
          <UserInfo
            user={member}
            context={ORGANIZATION_CONTEXT}
            description={member.title}
            organization={member.organization}
          >
            <ActionsDropdown
              role={member.role}
              currentUserRole={currentUserRole}
              isCurrentUser={!!member.isCurrentUser}
              onRemove={() => onRemove(member.id)}
              context={ORGANIZATION_CONTEXT}
            />
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
          <div className="hidden xl:flex w-[60px] h-[74px] justify-center items-center">
            <ActionsDropdown
              role={member.role}
              currentUserRole={currentUserRole}
              isCurrentUser={!!member.isCurrentUser}
              onRemove={() => onRemove(member.id)}
              context={ORGANIZATION_CONTEXT}
            />
          </div>
        </>
      )}
    </BaseMembersTable>
  );
};
