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

export const WithComponents = Template.bind({});
WithComponents.args = {
  title: 'Looking for over-the-counter sales?',
  image: {
    src: '/illustrations/concierge-small.svg',
  },
  description: (
    <p className="m-0">
      Contact{' '}
      <a
        href="mailto:sales@regen.network?subject=Over-the-counter sales"
        target="_blank"
        rel="noreferrer"
      >
        sales@regen.network
      </a>
      <span className="px-5">or</span>
      <a
        className="block"
        href="http://regen.network"
        target="_blank"
        rel="noreferrer"
      >
        schedule a call
      </a>
    </p>
  ),
};
