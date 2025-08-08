import { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import {
  ROLE_ADMIN,
  ROLE_OWNER,
} from '../ActionDropdown/ActionDropdown.constants';
import { ProjectRole } from '../BaseMembersTable/BaseMembersTable.types';
import { ProjectCollaborators } from './ProjectCollaborators';
import { mockCollaborators } from './ProjectCollaborators.mock';

const meta: Meta<typeof ProjectCollaborators> = {
  title: 'Marketplace/Organisms/ProjectCollaborators',
  component: ProjectCollaborators,
  argTypes: {
    collaborators: {
      control: 'object',
      description: 'List of collaborators',
    },
    onInvite: {
      action: 'invite-clicked',
      description: 'Called when invite button is clicked',
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

export const Default = (args: {
  onInvite: () => void;
  onUpdateRole: (id: string, role: ProjectRole) => void;
  onRemove?: (id: string) => void;
  onEditOrgRole: () => void;
}) => {
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
    (id: string) => {
      setCollaborators(prev => prev?.filter(c => c.id !== id));
      args.onRemove?.(id);
    },
    [args],
  );
  return (
    <ProjectCollaborators
      {...args}
      collaborators={collaborators}
      onToggleSort={toggleSort}
      onUpdateRole={updateRole}
      onRemove={handleRemove}
    />
  );
};

Default.args = {
  onInvite: action('invite-clicked'),
  onUpdateRole: action('role-changed'),
  onRemove: action('collaborator-removed'),
  onEditOrgRole: action('edit-org-role'),
};
