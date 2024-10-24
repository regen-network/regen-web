/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { SwitchWalletWarningModal } from './SwitchWalletWarningModal';

export default {
  title: 'Modal/SwitchWalletWarningModal',
  component: SwitchWalletWarningModal,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof SwitchWalletWarningModal>;

type Story = StoryObj<typeof SwitchWalletWarningModal>;

export const Basic: Story = {
  args: {
    address: 'regen91kd01z81ks54jf01jd420sk10c8120d',
  },
  render: args => {
    const [open, setOpen] = useState(true);
    const onClose = () => {
      setOpen(false);
    };

    return (
      <SwitchWalletWarningModal
        {...args}
        onClose={onClose}
        open={open}
        title="Please select the following wallet address in Keplr in order to proceed"
        bodyText="The email address you are using to log in is associated with the above wallet address, so it must be the currently selected account in Keplr in order to continue."
      />
    );
  },
};
