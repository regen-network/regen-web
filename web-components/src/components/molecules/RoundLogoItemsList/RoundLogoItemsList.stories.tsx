import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RoundLogoItemsList } from './RoundLogoItemsList';
import { RoundLogoMock } from './RoundLogoItemsList.mocks';

export default {
  title: 'molecules/RoundLogoItemsList',
  component: RoundLogoItemsList,
} as ComponentMeta<typeof RoundLogoItemsList>;

const Template: ComponentStory<typeof RoundLogoItemsList> = args => (
  <RoundLogoItemsList {...args} />
);

export const Default = Template.bind({});

const image = <img alt={RoundLogoMock.alt} src={RoundLogoMock.src as string} />;

Default.args = {
  title: 'certifications & ratings',
  items: [
    {
      image,
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
      image,
    },
  ],
};
