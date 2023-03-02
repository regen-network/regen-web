import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StatCard } from './StatCard';

export default {
  title: 'molecules/StatCard',
  component: StatCard,
} as ComponentMeta<typeof StatCard>;

const Template: ComponentStory<typeof StatCard> = args => (
  <StatCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'Carbon credits retired',
  stat: '588,448',
  description: 'Our unique ecocredits are high-quality and industry-leading.',
  image: { src: '/illustrations/carbon-credit.svg' },
};
