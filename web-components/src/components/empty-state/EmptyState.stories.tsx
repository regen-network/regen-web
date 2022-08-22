import { ComponentMeta, ComponentStory } from '@storybook/react';

import EmptyCartIcon from '../icons/EmptyCartIcon';
import { EmptyState } from './EmptyState';

export default {
  title: 'EmptyState',
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = args => (
  <EmptyState {...args} />
);

export const Default = Template.bind({});
Default.args = {
  message: 'No sell orders found',
  icon: <EmptyCartIcon sx={{ fontSize: 84, fill: 'none', color: '#8F8F8F' }} />,
};
