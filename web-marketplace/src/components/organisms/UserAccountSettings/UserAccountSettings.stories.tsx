import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Title } from 'web-components/src/components/typography';

import { UserAccountSettings } from './UserAccountSettings';

const meta: Meta<typeof UserAccountSettings> = {
  title: 'Marketplace/Organisms/UserAccountSettings',
  component: UserAccountSettings,
  args: {
    email: 'joemcnab@gmail.com',
    socialProviders: [
      {
        name: 'Google',
        connect: action('connect google'),
      },
      {
        name: 'LinkedIn',
        disconnect: async () => {
          action('disconnect linkedin')();
        },
      },
    ],
    walletProvider: {
      address: 'regenfoobar3792723djghsdg',
      disconnect: async () => {
        action('disconnect wallet')();
      },
    },
    custodialAddress: 'mock-regen-custodial-address',
  },
};

export default meta;
type Story = StoryObj<typeof UserAccountSettings>;

export const Default: Story = {};

export const Width375: Story = {
  name: 'Wrapped in a 375px mobile container',
  render: args => (
    <div className="bg-grey-100 p-50">
      <div className="flex flex-col gap-[24px] w-[375px]">
        <Title variant="h5">Settings</Title>
        <div className="border border-grey-200 border-solid px-10 py-40 bg-grey-0">
          <UserAccountSettings {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Width560: Story = {
  name: 'Wrapped in a 560px container',
  render: args => (
    <div className="bg-grey-100 p-50">
      <div className="flex flex-col gap-[24px] w-[560px]">
        <Title variant="h3">Settings</Title>
        <div className="border border-grey-200 border-solid px-50 py-50 bg-grey-0">
          <UserAccountSettings {...args} />
        </div>
      </div>
    </div>
  ),
};
