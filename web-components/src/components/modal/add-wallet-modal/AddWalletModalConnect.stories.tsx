import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { truncate } from '../../../utils/truncate';
import { AddWalletModalConnect } from './AddWalletModalConnect';

export default {
  title: 'Modal/AddWalletModalConnect',
  component: AddWalletModalConnect,
} as ComponentMeta<typeof AddWalletModalConnect>;

const Template: ComponentStory<typeof AddWalletModalConnect> = args => {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
  };

  return <AddWalletModalConnect {...args} onClose={onClose} open={open} />;
};

export const Default = Template.bind({});

Default.args = {
  partyInfo: {
    name: 'unnamed',
    addr: truncate('regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46'),
    profileImage: '/illustrations/frog.jpg',
    title: 'Connect wallet address',
    subtitle: 'Check your wallet for a confirmation popup.',
  },
};
