import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ActionCard } from './ActionCard';

export default {
  title: 'molecules/ActionCard',
  component: ActionCard,
} as ComponentMeta<typeof ActionCard>;

const Template: ComponentStory<typeof ActionCard> = args => (
  <ActionCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Buy credits via our concierge service',
  description: 'Our team can help you buy credits that meet your needs.',
  button: {
    text: 'Schedule a call',
  },
  image: {
    src: '/illustrations/concierge.svg',
  },
  note: { text: 'Or, contact sales@regen.network' },
};

export const Default2 = Template.bind({});
Default2.args = {
  title: 'Buy directly from the marketplace',
  description:
    'To buy using cryptocurrency, choose this option. Requires a Keplr wallet.',
  button: {
    text: 'Buy credits',
  },
  image: {
    src: '/illustrations/keplr-wallet.svg',
  },
};
