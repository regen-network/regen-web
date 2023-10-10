import { Meta, StoryObj } from '@storybook/react';

import EditIcon from '../../../components/icons/EditIcon';
import { CreditClassCardGrid } from './CreditClassCardGrid';

export default {
  title: 'molecules/CreditClassCardGrid',
  component: CreditClassCardGrid,
} as Meta<typeof CreditClassCardGrid>;

type Story = StoryObj<typeof CreditClassCardGrid>;

export const Basic: Story = {
  render: args => <CreditClassCardGrid {...args} />,
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
