import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { UserAccountSettings } from './UserAccountSettings';
import { Title } from 'web-components/lib/components/typography';

const meta: Meta<typeof UserAccountSettings> = {
  title: 'Registry/Organisms/UserAccountSettings',
  component: UserAccountSettings,
  args: {
    email: 'joemcnab@gmail.com',
    socialProviders: [
      {
        providerName: 'Google',
        connect: action('connect google'),
      },
      {
        providerName: 'LinkedIn',
        disconnect: action('disconnect linkedin'),
      },
    ],
    walletProvider: {
      address: 'regenfoobar3792723djghsdg',
      disconnect: action('disconnect wallet'),
    }
  },
};

export default meta;
type Story = StoryObj<typeof UserAccountSettings>;

export const Default: Story = {};

export const Width375: Story = {
  name: "Wrapped in a 375px mobile container",
  render: args => (
    <div className="bg-grey-50 p-50">
      <div className="flex flex-col gap-[24px] w-[375px]">
        <Title variant="h5">Settings</Title>
        <div className="border border-grey-100 border-solid px-10 py-40 bg-primary-main">
          <UserAccountSettings {...args} />
        </div>
      </div>
    </div>
  ),
};

export const Width560: Story = {
  name: "Wrapped in a 560px container",
  render: args => (
    <div className="bg-grey-50 p-50">
      <div className="flex flex-col gap-[24px] w-[560px]">
        <Title variant="h3">Settings</Title>
        <div className="border border-grey-100 border-solid px-50 py-50 bg-primary-main">
          <UserAccountSettings {...args} />
        </div>
      </div>
    </div>
  ),
};
