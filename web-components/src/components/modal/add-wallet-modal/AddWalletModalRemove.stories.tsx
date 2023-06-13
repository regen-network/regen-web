import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { truncate } from '../../../utils/truncate';
import { AddWalletModalRemove } from './AddWalletModalRemove';

export default {
  title: 'Modal/AddWalletModalRemove',
  component: AddWalletModalRemove,
  argTypes: {
    onClick: { action: 'clicked' },
    onCancel: { action: 'cancelled' },
  },
} as ComponentMeta<typeof AddWalletModalRemove>;

const Template: ComponentStory<typeof AddWalletModalRemove> = args => {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
  };

  return <AddWalletModalRemove {...args} onClose={onClose} open={open} />;
};

export const Default = Template.bind({});

Default.args = {
  partyInfo: {
    name: 'unnamed',
    addr: truncate('regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46'),
    profileImage: '/illustrations/frog.jpg',
  },
};
