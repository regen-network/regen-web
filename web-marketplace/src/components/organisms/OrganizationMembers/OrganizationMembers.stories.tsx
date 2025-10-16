import { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import { BaseMemberRole } from '../BaseMembersTable/BaseMembersTable.types';
import { OrganizationMembers } from './OrganizationMembers';
import { mockMembers, mockAccounts } from './OrganizationMembers.mock';
import { Member } from './OrganizationMembers.types';
import { AccountsOrderBy } from 'generated/graphql';

const meta: Meta<typeof OrganizationMembers> = {
  title: 'Marketplace/Organisms/OrganizationMembers',
  component: OrganizationMembers,
  argTypes: {
    onSaveProfile: {
      action: 'save-profile',
    },
    onUpload: {
      action: 'upload',
    },
  },
};

export default meta;

export const Default = (args: {
  onSaveProfile: () => Promise<void>;
  onUpload: () => Promise<{ url: string }>;
}) => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [sortDir, setSortDir] = useState<
    AccountsOrderBy.NameAsc | AccountsOrderBy.NameDesc
  >(AccountsOrderBy.NameAsc);
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
    const dir =
      sortDir === AccountsOrderBy.NameAsc
        ? AccountsOrderBy.NameDesc
        : AccountsOrderBy.NameAsc;
    setSortDir(dir);
    setMembers(prev =>
      [...prev].sort((a, b) =>
        dir === AccountsOrderBy.NameAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
  };

  const updateRole = async (id: string, role: BaseMemberRole) =>
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

  const updateVisibility = async (id: string, visible: boolean) =>
    setMembers(prev =>
      prev.map(member => (member.id === id ? { ...member, visible } : member)),
    );

  const handleRemove = async (id: string) =>
    setMembers(prev => prev.filter(member => member.id !== id));

  const addMember = async (data: {
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
      onChainRoleId: 1,
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
    <OrganizationMembers
      members={members}
      onToggleSort={toggleSort}
      onUpdateRole={updateRole}
      onUpdateVisibility={updateVisibility}
      onRemove={handleRemove}
      setDebouncedValue={setDebouncedValue}
      onAddMember={addMember}
      accounts={accounts}
      onSaveProfile={args.onSaveProfile}
      onUpload={args.onUpload}
      sortDir={sortDir}
    />
  );
};

Default.args = {
  onSaveProfile: action('save profile'),
  onUpload: action('upload'),
};
