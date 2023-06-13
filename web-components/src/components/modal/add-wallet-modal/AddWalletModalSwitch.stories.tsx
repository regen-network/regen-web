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

  return <AddWalletModalSwitch onClose={onClose} open={open} />;
};

export const Default = Template.bind({});
