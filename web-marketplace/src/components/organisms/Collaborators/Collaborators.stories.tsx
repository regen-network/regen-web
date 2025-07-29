import React, { useState } from 'react';
import type { Meta } from '@storybook/react';

import { CollaboratorsManagement } from './Collaborators';
import { mockCollaborators } from './Collaborators.mock';
import { ProjectRoleType } from './Collaborators.types';

const meta: Meta<typeof CollaboratorsManagement> = {
  title: 'Marketplace/Organisms/CollaboratorsManagement',
  component: CollaboratorsManagement,
  argTypes: {
    collaborators: {
      control: 'object',
      description: 'List of collaborators',
    },
  },
};

export default meta;

const StoryComponent = (args: { collaborators: typeof mockCollaborators }) => {
  const [collaborators, setCollaborators] = useState(args.collaborators);

  const handleRoleChange = (id: string, role: ProjectRoleType) => {
    setCollaborators(prev =>
      prev.map(c => (c.id === id ? { ...c, projectRole: role } : c)),
    );
  };

  const handleRemove = (id: string) => {
    setCollaborators(prev => prev.filter(c => c.id !== id));
  };

  return (
    <CollaboratorsManagement
      {...args}
      collaborators={collaborators}
      onRoleChange={handleRoleChange}
      onRemove={handleRemove}
      onInvite={() => alert('Invite Collaborator')}
    />
  );
};

export const Default = (args: { collaborators: typeof mockCollaborators }) => {
  const key = JSON.stringify(args.collaborators);

  return <StoryComponent key={key} {...args} />;
};

Default.args = {
  collaborators: mockCollaborators,
};
