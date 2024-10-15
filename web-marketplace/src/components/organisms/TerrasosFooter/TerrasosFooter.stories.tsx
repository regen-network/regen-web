import { Meta, StoryObj } from '@storybook/react';

import { TerrasosFooter } from './TerrasosFooter';
import { TerrasosFooterSocialItems } from './TerrasosFooter.constants';

export default {
  title: 'Marketplace/Atoms/TerrasosFooter',
  component: TerrasosFooter,
} as Meta<typeof TerrasosFooter>;

type Story = StoryObj<typeof TerrasosFooter>;

export const Basic: Story = {
  render: args => <TerrasosFooter {...args} />,
};

Basic.args = {
  poweredBy: 'Powered by',
  copyright: 'Copyright © 2024 Terrasos | All rights reserved',
  socialItems: TerrasosFooterSocialItems,
};
