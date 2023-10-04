import type { Meta, StoryObj } from "@storybook/react";

import { UserAccountSettings } from './UserAccountSettings';

const meta: Meta<typeof UserAccountSettings> = {
  title: 'Registry/Organisms/UserAccountSettings',
  component: UserAccountSettings,
};

export default meta;
type Story = StoryObj<typeof UserAccountSettings>;

export const Primary: Story = {}
