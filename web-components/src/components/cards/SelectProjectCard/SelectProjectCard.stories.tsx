import { Meta, StoryObj } from '@storybook/react';

import { mockProjects } from '../../organisms/MigrateProjects/MigrateProjects.mock';
import { SelectProjectCard } from './SelectProjectCard';

const meta: Meta<typeof SelectProjectCard> = {
  title: 'Cards/SelectProjectCard',
  component: SelectProjectCard,
  argTypes: {
    project: { control: 'object' },
    selected: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  decorators: [
    Story => (
      <div className="w-full h-full flex justify-center items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SelectProjectCard>;

export const Default: Story = {
  args: {
    project: { ...mockProjects[0], program: undefined },
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const WithProgram: Story = {
  args: {
    project: mockProjects[0],
  },
};
