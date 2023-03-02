import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StatCardsSection } from './StatCardsSection';
import { statCardsMock } from './StatCardsSection.mock';

export default {
  title: 'organisms/StatCardsSection',
  component: StatCardsSection,
} as ComponentMeta<typeof StatCardsSection>;

const Template: ComponentStory<typeof StatCardsSection> = args => (
  <StatCardsSection {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'Stats',
  title: 'Our impact',
  cards: [...statCardsMock, ...statCardsMock],
};
