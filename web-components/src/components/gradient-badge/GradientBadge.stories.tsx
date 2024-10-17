import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GradientBadge } from './GradientBadge';

export default {
  title: 'GradientBadge',
  component: GradientBadge,
} as ComponentMeta<typeof GradientBadge>;

const Template: ComponentStory<typeof GradientBadge> = args => (
  <GradientBadge {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'SOLD OUT',
};

Default.argTypes = {};
