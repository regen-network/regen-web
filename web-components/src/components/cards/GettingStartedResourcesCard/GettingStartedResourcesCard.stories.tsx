import { Link } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { GettingStartedResourcesCard } from './GettingStartedResourcesCard';

export default {
  title: 'GettingStartedResourcesCard',
  component: GettingStartedResourcesCard,
} as ComponentMeta<typeof GettingStartedResourcesCard>;

const Template: ComponentStory<typeof GettingStartedResourcesCard> = args => (
  <GettingStartedResourcesCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  header: 'Bridging',
  description: [
    {
      _key: '6d8f24dd57d3',
      _type: 'block',
      children: [
        {
          _key: '044591f88f82',
          _type: 'span',
          marks: [],
          text: 'Move your assets easily to another chain using our cross-chain bridge service.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
  imageUrl: './bridge-side.svg',
  mobileImageUrl: './bridge.svg',
  links: [
    {
      buttonText: 'Learn about bridging',
      buttonHref: 'https://guides.regen.network/guides/regen-marketplace',
      buttonTarget: '_blank',
    },
  ],
  linkComponent: Link,
};

Default.argTypes = {};
