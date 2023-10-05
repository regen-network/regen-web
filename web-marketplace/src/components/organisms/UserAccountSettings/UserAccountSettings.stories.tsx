import type { Meta, StoryObj } from '@storybook/react';

import { UserAccountSettings, UserAccountSettingsProps } from "./UserAccountSettings";
import { Title } from 'web-components/lib/components/typography';

const meta: Meta<typeof UserAccountSettings> = {
  title: 'Registry/Organisms/UserAccountSettings',
  component: UserAccountSettings,
};

export default meta;
type Story = StoryObj<typeof UserAccountSettings>;

const defaultProps: UserAccountSettingsProps = {
  email: 'joemcnab@gmail.com',
  socialProviders: [
    {
      providerName: 'Google',
      connected: false,
      connect: () => {},
    },
    {
      providerName: 'LinkedIn',
      connected: false,
      connect: () => {},
    }
  ],
  walletProvider: {
    connected: false,
    connect: () => {},
  }
}

export const Primary: Story = {
  render: () => (
    <UserAccountSettings {...defaultProps} />
  ),
};

export const Width560: Story = {
  render: () => (
    <div className="bg-grey-50 p-50">
      <div className="flex flex-col gap-[24px] w-[560px]">
        <Title variant="h3">Settings</Title>
        <div className="border border-grey-100 border-solid">
          <UserAccountSettings {...defaultProps} />
        </div>
      </div>
    </div>
  ),
};
