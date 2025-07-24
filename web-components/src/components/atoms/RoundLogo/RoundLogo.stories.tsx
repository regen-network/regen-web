import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RoundLogo } from './RoundLogo';

export default {
  title: 'atoms/RoundLogo',
  component: RoundLogo,
} as ComponentMeta<typeof RoundLogo>;

const Template: ComponentStory<typeof RoundLogo> = args => (
  <RoundLogo {...args} />
);

export const Default = Template.bind({});

Default.args = {
  image: <img src="/logos/beZero.svg" alt="Be Zero Logo" />,
};
