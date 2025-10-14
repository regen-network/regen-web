import { useEffect, useState } from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import type { Meta } from '@storybook/react';
import { Provider as JotaiProvider } from 'jotai';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../../ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from '../../BaseMembersTable/BaseMembersTable.types';
import { mockMembers, mockAccounts } from '../OrganizationMembers.mock';
import { Member } from '../OrganizationMembers.types';
import { OrganizationMembersInviteTable } from './InviteMembers.Table';

i18n.activate('en');

const meta: Meta<typeof OrganizationMembersInviteTable> = {
  title: 'Marketplace/Organisms/InviteMembersTable',
  component: OrganizationMembersInviteTable,
  decorators: [
    Story => (
      <I18nProvider i18n={i18n}>
        <JotaiProvider>
          <Story />
        </JotaiProvider>
      </I18nProvider>
    ),
  ],
};

export default meta;

export const Default = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [accounts, setAccounts] = useState<any>(null);

  useEffect(() => {
    if (debouncedValue.trim()) {
      const filteredAccounts = mockAccounts.filter(account => {
        const nameMatch = account.name
          ?.toLowerCase()
          .includes(debouncedValue.toLowerCase());
        const addrMatch = account.addr
          ?.toLowerCase()
          .includes(debouncedValue.toLowerCase());
        return nameMatch || addrMatch;
      });

      setAccounts({
        getAccountsByNameOrAddr: {
          nodes: filteredAccounts,
        },
      });
    } else {
      setAccounts(null);
    }
  }, [debouncedValue]);

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

  const addMember = (data: {
    role: BaseMemberRole | undefined;
    addressOrEmail: string;
    visible: boolean;
  }) => {
    if (!data.role) return;

    const foundAccount = mockAccounts.find(
      acc =>
        acc.addr === data.addressOrEmail || acc.name === data.addressOrEmail,
    );

    const newMember: Member = {
      id: `member-${Date.now()}`,
      name: foundAccount?.name || data.addressOrEmail,
      email: foundAccount?.addr || data.addressOrEmail,
      avatar: foundAccount?.image || undefined,
      role: data.role,
      visible: data.visible,
      invited: true,
      isCurrentUser: false,
      hasWalletAddress: true,
      title: foundAccount?.description || '',
      organization:
        foundAccount?.type === 'organization' ? foundAccount.name || '' : '',
    };

    setMembers(prev => [...prev, newMember]);
  };

  return (
    <>
      <OrganizationMembersInviteTable
        onRemove={removeMember}
        onAddMember={addMember}
        members={members}
        sortDir={sortDir}
        onToggleSort={toggleSort}
        onUpdateRole={updateRole}
        onUpdateVisibility={updateVisibility}
        accounts={accounts}
        setDebouncedValue={setDebouncedValue}
      />
    </>
  );
};

Default.args = {};
