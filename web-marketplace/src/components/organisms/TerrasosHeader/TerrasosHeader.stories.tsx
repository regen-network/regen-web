import { Meta, StoryObj } from '@storybook/react';

import { TerrasosHeader } from './TerrasosHeader';
import { terrasosHeaderItemsMock } from './TerrasosHeader.mock';

export default {
  title: 'Marketplace/Organisms/TerrasosHeader',
  component: TerrasosHeader,
} as Meta<typeof TerrasosHeader>;

type Story = StoryObj<typeof TerrasosHeader>;

export const Basic: Story = { render: args => <TerrasosHeader {...args} /> };

Basic.args = {
  logo: '/logos/terrasos.png',
  items: terrasosHeaderItemsMock,
};
