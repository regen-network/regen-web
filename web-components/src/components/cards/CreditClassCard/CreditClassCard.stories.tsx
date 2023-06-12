import { Link } from '@mui/material';
import { Box } from '@mui/system';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CreditClassCard } from './CreditClassCard';

export default {
  title: 'Cards/CreditClassCard',
  component: CreditClassCard,
} as ComponentMeta<typeof CreditClassCard>;

const Template: ComponentStory<typeof CreditClassCard> = args => (
  <Box>
    <CreditClassCard {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  type: {
    name: 'Carbon',
    icon: {
      src: '/icons/carbon-white.svg',
      alt: 'carbon',
    },
  },
  title: 'Verified Carbon Standard (C01)',
  description:
    'This credit class provides a vehicle for nature based Verified Carbon Units (VCUs) to enter the blockchain space via issuance on Regen Ledger. ',
  imgSrc: '/coorong.png',
  generationMethod: {
    name: 'Carbon removal',
    icon: {
      src: '/icons/carbon.svg',
      alt: 'carbon',
    },
  },
  methodology: {
    href: '#',
    text: 'Ruuts Protocol Soil Carbon Sequestration Methodology',
  },
  linkComponent: Link,
};
