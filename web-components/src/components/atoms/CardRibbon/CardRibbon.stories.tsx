import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CardRibbon } from './CardRibbon';

export default {
  title: 'atoms/CardRibbon',
  component: CardRibbon,
} as ComponentMeta<typeof CardRibbon>;

const Template: ComponentStory<typeof CardRibbon> = args => (
  <CardRibbon {...args} />
);

export const Default = Template.bind({});

Default.args = {
  label: 'Carbon',
  icon: {
    src: 'https://cdn.sanity.io/images/jm12rn9t/staging/c6de355349dec9f4914fea0705e293596d40f068-66x106.svg',
    alt: 'co2',
  },
};

Default.argTypes = {};
