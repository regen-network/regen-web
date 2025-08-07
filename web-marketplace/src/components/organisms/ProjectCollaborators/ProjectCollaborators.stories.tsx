import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

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
    onRoleChange: {
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

const StoryComponent = (args: {
  collaborators: typeof mockCollaborators;
  onInvite?: () => void;
  onRoleChange?: (id: string, role: ProjectRole) => void;
  onRemove?: (id: string) => void;
}) => {
  const [collaborators, setCollaborators] = useState(args.collaborators);

  const handleRoleChange = (id: string, role: ProjectRole) => {
    setCollaborators(prev =>
      prev.map(c => (c.id === id ? { ...c, projectRole: role } : c)),
    );
    // Call the Storybook action
    args.onRoleChange?.(id, role);
  };

  const handleRemove = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
    // Call the Storybook action
    args.onRemove?.(id);
  };

  return (
    <ProjectCollaborators
      {...args}
      collaborators={collaborators}
      onRoleChange={handleRoleChange}
      onRemove={handleRemove}
      onInvite={args.onInvite} // Use the Storybook action
    />
  );
};

export const Default = (args: {
  collaborators: typeof mockCollaborators;
  onInvite?: () => void;
  onRoleChange?: (id: string, role: ProjectRole) => void;
  onRemove?: (id: string) => void;
}) => {
  const key = JSON.stringify(args.collaborators);

  return <StoryComponent key={key} {...args} />;
};

Default.args = {
  collaborators: mockCollaborators,
  onInvite: action('invite-clicked'),
  onRoleChange: action('role-changed'),
  onRemove: action('collaborator-removed'),
};
