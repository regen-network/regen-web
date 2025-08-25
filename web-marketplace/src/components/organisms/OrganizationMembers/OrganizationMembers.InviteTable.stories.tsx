import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembersInviteTable } from './OrganizationMembers.InviteTable';
import { mockMembers } from './OrganizationMembers.mock';
import { Member } from './OrganizationMembers.types';

const meta: Meta<typeof OrganizationMembersInviteTable> = {
  title: 'Marketplace/Organisms/OrganizationMembersInviteTable',
  component: OrganizationMembersInviteTable,
  argTypes: {
    onInvite: {
      action: 'invite-clicked',
      description: 'Called when invite button is clicked',
    },
  },
};

export default meta;

export const Default = (args: { onInvite: () => void }) => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

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

  const updateRole = (id: string, role: BaseMemberRole) =>
    setMembers(prev =>
      prev.map(member => {
        if (role === ROLE_OWNER) {
          if (member.id === id) {
            return { ...member, role: ROLE_OWNER };
          }
          return member.role === ROLE_OWNER
            ? { ...member, role: ROLE_ADMIN }
            : member;
        }
        return member.id === id ? { ...member, role } : member;
      }),
    );

  const updateVisibility = (id: string, visible: boolean) =>
    setMembers(prev =>
      prev.map(member => (member.id === id ? { ...member, visible } : member)),
    );

  const removeMember = (id: string) =>
    setMembers(prev => prev.filter(member => member.id !== id));

  return (
    <OrganizationMembersInviteTable
      onRemove={removeMember}
      {...args}
      members={members}
      sortDir={sortDir}
      onToggleSort={toggleSort}
      onUpdateRole={updateRole}
      onUpdateVisibility={updateVisibility}
    />
  );
};

Default.args = {
  onInvite: action('invite-clicked'),
};
