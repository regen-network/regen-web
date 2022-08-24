import { ComponentMeta, ComponentStory } from '@storybook/react';

import OutlinedButton from '../buttons/OutlinedButton';
import EmptyCartIcon from '../icons/EmptyCartIcon';
import PlusIcon from '../icons/PlusIcon';
import { EmptyState } from './EmptyState';

export default {
  title: 'EmptyState',
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = args => (
  <EmptyState {...args} />
);

const TemplateWithChildren: ComponentStory<typeof EmptyState> = args => (
  <EmptyState {...args}>
    <OutlinedButton startIcon={<PlusIcon color="#4FB573" />}>
      create one
    </OutlinedButton>
  </EmptyState>
);

export const Default = Template.bind({});
Default.args = {
  message: 'No sell orders found',
  icon: <EmptyCartIcon sx={{ fontSize: 84, fill: 'none', color: '#8F8F8F' }} />,
};

export const WithChildren = TemplateWithChildren.bind({});
WithChildren.args = {
  message: 'No sell orders found',
  icon: <EmptyCartIcon sx={{ fontSize: 84, fill: 'none', color: '#8F8F8F' }} />,
};
