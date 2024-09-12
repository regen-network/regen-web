import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AddWalletModalSwitch } from './AddWalletModalSwitch';

export default {
  title: 'Modal/AddWalletModalSwitch',
  component: AddWalletModalSwitch,
} as ComponentMeta<typeof AddWalletModalSwitch>;

const Template: ComponentStory<typeof AddWalletModalSwitch> = args => {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <AddWalletModalSwitch
      onClose={onClose}
      open={open}
      title="Switch wallet addresses in Keplr to add another address to your account"
      subtitle="The current address is already linked to your account.
Please first switch wallet addresses in the Keplr app to be able to add another address to your account."
    />
  );
};

export const Default = Template.bind({});
