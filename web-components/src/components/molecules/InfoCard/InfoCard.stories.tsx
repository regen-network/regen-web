import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InfoCard } from './InfoCard';

export default {
  title: 'molecules/InfoCard',
  component: InfoCard,
} as ComponentMeta<typeof InfoCard>;

const Template: ComponentStory<typeof InfoCard> = args => (
  <InfoCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Looking for over-the-counter sales?',
  image: {
    src: '/illustrations/concierge-small.svg',
  },
  description: 'Contact sales@regen.network or schedule a call.',
};
