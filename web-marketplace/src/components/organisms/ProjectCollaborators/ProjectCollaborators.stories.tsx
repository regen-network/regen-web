import { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import {
  MemberData,
  ProjectRole,
} from '../BaseMembersTable/BaseMembersTable.types';
import { mockAccounts } from '../OrganizationMembers/OrganizationMembers.mock';
import { ProjectCollaborators } from './ProjectCollaborators';
import { mockCollaborators } from './ProjectCollaborators.mock';
import { ProjectCollaboratorsProps } from './ProjectCollaborators.types';

const meta: Meta<typeof ProjectCollaborators> = {
  title: 'Marketplace/Organisms/ProjectCollaborators',
  component: ProjectCollaborators,
  argTypes: {
    collaborators: {
      control: 'object',
      description: 'List of collaborators',
    },
    onUpdateRole: {
      action: 'role-changed',
      description: 'Called when a collaborator role is changed',
    },
    onRemove: {
      action: 'collaborator-removed',
      description: 'Called when a collaborator is removed',
    },
  },
};

export default meta;

export const Default = (
  args: Pick<
    ProjectCollaboratorsProps,
    | 'onAddMember'
    | 'onUpdateRole'
    | 'onRemove'
    | 'onEditOrgRole'
    | 'isProjectDao'
    | 'canMigrate'
    | 'organizations'
    | 'createOrganization'
    | 'migrateProject'
    | 'isDraftOnChainProject'
  >,
) => {
  const [collaborators, setCollaborators] = useState(mockCollaborators || []);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  /* ───── sort handler ───── */
  const toggleSort = useCallback(() => {
    const dir = sortDir === 'asc' ? 'desc' : 'asc';
    setSortDir(dir);
    setCollaborators(prev =>
      [...(prev ?? [])].sort((a, b) =>
        dir === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      ),
    );
  }, [sortDir]);

  /* ───── role / remove handlers ───── */
  const updateRole = useCallback(
    (id: string, role: ProjectRole) => {
      setCollaborators(prev =>
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
      args.onUpdateRole?.(id, role);
    },
    [args],
  );
  const handleRemove = useCallback(
    async (id: string) => {
      setCollaborators(prev => prev?.filter(c => c.id !== id));
      args.onRemove?.(id);
    },
    [args],
  );

  const addMember = async (data: MemberData<ProjectRole>) => {
    if (!data.role) return;

    const foundAccount = mockAccounts.find(
      acc =>
        acc.addr === data.addressOrEmail || acc.name === data.addressOrEmail,
    );

    const newMember = {
      id: `member-${Date.now()}`,
      name: foundAccount?.name || data.addressOrEmail,
      email: foundAccount?.addr || data.addressOrEmail,
      avatar: foundAccount?.image || undefined,
      role: data.role,
      onChainRoleId: 1,
      visible: data.visible,
      isCurrentUser: false,
      hasWalletAddress: true,
      title: foundAccount?.description || '',
      organization:
        foundAccount?.type === 'organization' ? foundAccount.name || '' : '',
    };

    setCollaborators(prev => [...prev, newMember]);
    args.onAddMember?.(data);
  };

  return (
    <ProjectCollaborators
      {...args}
      collaborators={collaborators}
      onToggleSort={toggleSort}
      onUpdateRole={updateRole}
      onRemove={handleRemove}
      onAddMember={addMember}
    />
  );
};

Default.args = {
  onUpdateRole: action('role-changed'),
  onRemove: action('collaborator-removed'),
  onEditOrgRole: action('edit-org-role'),
  isProjectDao: true,
  canMigrate: true,
  organizations: [],
  createOrganization: action('create-organization'),
  migrateProject: action('migrate-project'),
  currentDaoAddress: 'dao1xyz...',
  isDraftOnChainProject: false,
};
