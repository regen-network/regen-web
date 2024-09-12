import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AddWalletModalSwitchWarning } from './AddWalletModalSwitchWarning';

export default {
  title: 'Modal/AddWalletModalSwitchWarning',
  component: AddWalletModalSwitchWarning,
} as ComponentMeta<typeof AddWalletModalSwitchWarning>;

const Template: ComponentStory<typeof AddWalletModalSwitchWarning> = args => {
  const [open, setOpen] = useState(true);
  const onClose = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 1000);
  };

  return (
    <AddWalletModalSwitchWarning
      onClose={onClose}
      open={open}
      title="Please switch to this address in Keplr to access this profile."
    />
  );
};

export const Default = Template.bind({});
