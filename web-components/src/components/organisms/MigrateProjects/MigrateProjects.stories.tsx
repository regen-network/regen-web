import { Meta, StoryObj } from '@storybook/react';

import { MigrateProjects } from './MigrateProjects';
import { mockProjects } from './MigrateProjects.mock';

const meta: Meta<typeof MigrateProjects> = {
  title: 'Organisms/MigrateProjects',
  component: MigrateProjects,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof MigrateProjects>;

export const Default: Story = {
  args: {
    projects: mockProjects,
  },
};
