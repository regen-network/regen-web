import { Meta, StoryObj } from '@storybook/react';

import { TebuHeader } from './TebuHeader';
import { tebuHeaderItemsMock } from './TebuHeader.mock';

export default {
  title: 'Marketplace/Organisms/TebuHeader',
  component: TebuHeader,
} as Meta<typeof TebuHeader>;

type Story = StoryObj<typeof TebuHeader>;

export const Basic: Story = { render: args => <TebuHeader {...args} /> };

Basic.args = {
  logo: '/logos/terrasos.png',
  items: tebuHeaderItemsMock,
};
