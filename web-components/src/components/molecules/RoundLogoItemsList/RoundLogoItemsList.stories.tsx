import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RoundLogoMock } from 'src/components/atoms/RoundLogo/RoundLogo.mock';

import { RoundLogoItemsList } from './RoundLogoItemsList';

export default {
  title: 'molecules/RoundLogoItemsList',
  component: RoundLogoItemsList,
} as ComponentMeta<typeof RoundLogoItemsList>;

const Template: ComponentStory<typeof RoundLogoItemsList> = args => (
  <RoundLogoItemsList {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'certifications & ratings',
  items: [
    {
      name: 'ICROA approved',
      image: RoundLogoMock,
    },
    {
      name: 'BeZero carbon rating: AAA-',
      image: RoundLogoMock,
    },
  ],
};
