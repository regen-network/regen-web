import { useState } from 'react';
import { useLingui } from '@lingui/react';

import { ActionsDropdown } from '../ActionDropdown/ActionsDropdown';
import { BaseTable, UserInfo } from '../BaseTable/BaseTable';
import {
  INVITE_MEMBERS,
  ORGANIZATION_MEMBERS,
  ORGANIZATION_MEMBERS_DESCRIPTION,
  VISIBILITY_ON_PROFILE,
} from './Members.constants';
import { mockMembers } from './Members.mock';
import { Member, MemberRole } from './Members.types';
import { MemberRoleDropdown } from './MembersRoleDropdown';
import { VisibilitySwitch } from './VisibilitySwitch';

export const Members = ({
  initialMembers = mockMembers,
  onInvite,
}: {
  initialMembers?: Member[];
  onInvite?: () => void;
}) => {
  const { _ } = useLingui();
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const currentUserRole: MemberRole =
    members.find(m => m.isCurrentUser)?.role ?? 'viewer';
  const canAdmin = currentUserRole === 'admin';
  const isOnlyAdmin = members.filter(m => m.role === 'admin').length <= 1;

  const toggleSort = () => {
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    setSortDir(dir);
    setMembers(prev =>
      [...prev].sort((a, b) =>
        dir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
  };

  const updateRole = (id: string, role: MemberRole) =>
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, role } : m)));

  const updateVisibility = (id: string, visible: boolean) =>
    setMembers(prev => prev.map(m => (m.id === id ? { ...m, visible } : m)));

  const handleRemove = (id: string) =>
    setMembers(prev => prev.filter(m => m.id !== id));

  return (
    <BaseTable
      users={members}
      title={_(ORGANIZATION_MEMBERS)}
      description={_(ORGANIZATION_MEMBERS_DESCRIPTION)}
      inviteButtonText={_(INVITE_MEMBERS)}
      canAdmin={canAdmin}
      onInvite={onInvite}
      onSort={toggleSort}
      sortDir={sortDir}
      context="members"
      additionalColumns={[_(VISIBILITY_ON_PROFILE)]}
      showMobileInvite={true}
    >
      {m => (
        <>
          {/* Info + mobile dots */}
          <UserInfo
            user={m}
            context="members"
            description={m.title}
            organization={m.organization}
          >
            <ActionsDropdown
              role={m.role}
              currentUserRole={currentUserRole}
              isCurrentUser={!!m.isCurrentUser}
              onRemove={() => handleRemove(m.id)}
              context="members"
              isOnlyAdmin={isOnlyAdmin}
            />
          </UserInfo>

          {/* Mobile row: dropdown + switch */}
          <div className="flex gap-20 xl:hidden w-full px-6 justify-between items-center">
            <MemberRoleDropdown
              role={m.role}
              disabled={!canAdmin}
              isOnlyAdmin={isOnlyAdmin}
              isCurrentUser={m.isCurrentUser}
              onChange={r => updateRole(m.id, r)}
            />
            <VisibilitySwitch
              checked={m.visible}
              disabled={!canAdmin}
              isCurrentUser={m.isCurrentUser}
              onChange={v => updateVisibility(m.id, v)}
            />
          </div>

          {/* Desktop columns */}
          <div className="hidden xl:flex w-[170px] items-center">
            <MemberRoleDropdown
              role={m.role}
              disabled={!canAdmin}
              isOnlyAdmin={isOnlyAdmin}
              isCurrentUser={m.isCurrentUser}
              onChange={r => updateRole(m.id, r)}
            />
          </div>
          <div className="hidden xl:flex w-[150px] items-center">
            <VisibilitySwitch
              checked={m.visible}
              disabled={!canAdmin}
              isCurrentUser={m.isCurrentUser}
              onChange={v => updateVisibility(m.id, v)}
            />
          </div>
          <div className="hidden xl:flex w-[60px] h-[74px] justify-center items-center">
            <ActionsDropdown
              role={m.role}
              currentUserRole={currentUserRole}
              isCurrentUser={!!m.isCurrentUser}
              onRemove={() => handleRemove(m.id)}
              context="members"
              isOnlyAdmin={isOnlyAdmin}
            />
          </div>
        </>
      )}
    </BaseTable>
  );
};
