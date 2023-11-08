import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import AccountAddress from './AccountAddress';

const meta: Meta<typeof AccountAddress> = {
  title: 'Account',
  component: AccountAddress,
};
export default meta;

type Story = StoryObj<typeof AccountAddress>;

export const Default: Story = {
  args: {
    name: 'Regen Network Development, PBC',
    address: 'regen:1p6syuqk3e5a8hwp8e20jyjwr8p7nj270x4spqm',
    onClick: action('onClick'),
  },
};
