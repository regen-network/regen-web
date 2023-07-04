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
      image: RoundLogoMock,
      link: {
        text: 'ICROA approved',
        href: 'https://www.icroa.org/',
      },
    },
    {
      link: {
        text: 'BeZero carbon rating: AAA-',
        href: 'https://bezero.org/',
      },
      image: RoundLogoMock,
    },
  ],
};
