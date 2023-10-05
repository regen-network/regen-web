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
        connected: false,
        connect: action('connect google'),
      },
      {
        providerName: 'LinkedIn',
        connected: true,
        connect: action('connect linkedin'),
      },
    ],
    walletProvider: {
      connected: false,
      connect: action('connect wallet'),
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserAccountSettings>;

export const Default: Story = {};

export const Width560: Story = {
  name: "Wrapped in a 560px container",
  render: args => (
    <div className="bg-grey-50 p-50">
      <div className="flex flex-col gap-[24px] w-[560px]">
        <Title variant="h3">Settings</Title>
        <div className="border border-grey-100 border-solid">
          <UserAccountSettings {...args} />
        </div>
      </div>
    </div>
  ),
};
