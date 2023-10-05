import type { Meta, StoryObj } from '@storybook/react';

import { UserAccountSettings } from './UserAccountSettings';
import { Title } from 'web-components/lib/components/typography';

const meta: Meta<typeof UserAccountSettings> = {
  title: 'Registry/Organisms/UserAccountSettings',
  component: UserAccountSettings,
};

export default meta;
type Story = StoryObj<typeof UserAccountSettings>;

export const Primary: Story = {};

export const Width560: Story = {
  render: () => (
    <div className="bg-background p-50">
      <div className="flex flex-col gap-[24px] w-[560px]">
        <Title variant="h3">Settings</Title>
        <div className="border border-light-grey border-solid">
          <UserAccountSettings />
        </div>
      </div>
    </div>
  ),
};
