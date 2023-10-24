import { Meta, StoryObj } from '@storybook/react';

import EditIcon from '../../icons/EditIcon';
import { CreditClassGridCard } from './CreditClassGridCard';

export default {
  title: 'molecules/CreditClassGridCard',
  component: CreditClassGridCard,
} as Meta<typeof CreditClassGridCard>;

type Story = StoryObj<typeof CreditClassGridCard>;

export const Basic: Story = {
  render: args => <CreditClassGridCard {...args} sx={{ maxWidth: 365 }} />,
};

Basic.args = {
  imgSrc: '/illustrations/sheep-image-bg.jpg',
  name: 'CarbonPlus Grasslands',
  purchaseInfo: {
    sellInfo: {
      creditsAvailable: 0,
      creditsAvailableForUser: 1190,
      avgPricePerTonLabel: '$17.20',
    },
  },
  button: {
    text: 'edit credit class',
    startIcon: <EditIcon />,
  },
};
