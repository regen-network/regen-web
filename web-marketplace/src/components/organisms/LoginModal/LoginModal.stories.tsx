import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LoginModal, Props } from './LoginModal';
import { socialProvidersMock, wallets } from './LoginModal.mock';
import { LoginModalState } from './LoginModal.types';

const meta: Meta<typeof LoginModal> = {
  title: 'Registry/Organisms/LoginModal',
  component: LoginModal,
};
export default meta;

type Story = StoryObj<typeof LoginModal>;

export const Default: Story = {
  render: args => <Template {...args} />,
};

const Template = (args: Props) => {
  const [open, setOpen] = useState(true);
  const [modalState, setModalState] = useState<LoginModalState>();
  const onClose = () => {
    setOpen(false);
    setModalState('select');
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  return (
    <LoginModal
      {...args}
      wallets={wallets}
      socialProviders={socialProvidersMock}
      state={modalState}
      open={open}
      onClose={onClose}
    />
  );
};

Default.args = {
  onClose: () => undefined,
};

Default.argTypes = {
  onEmailSubmit: { action: 'onEmailSubmit' },
};
