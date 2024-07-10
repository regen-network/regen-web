import { Meta, StoryObj } from '@storybook/react';

import { OrderSummaryCard } from './OrderSummaryCard';

export default {
  title: 'Cards/OrderSummaryCard',
  component: OrderSummaryCard,
} as Meta<typeof OrderSummaryCard>;

type Story = StoryObj<typeof OrderSummaryCard>;

export const Default: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

Default.args = {
  order: {
    image: '/coorong.png',
    projectName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pricePerCredit: 2,
    credits: 50,
    currency: 'USD',
  },
};

export const WithPaymentDetails: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithPaymentDetails.args = {
  order: {
    image: '/coorong.png',
    projectName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pricePerCredit: 2,
    credits: 50,
    currency: 'USD',
  },
  currentBuyingStep: 2,
  paymentMethod: {
    type: 'visa',
    cardNumber: '1234 5678 9012 3456',
  },
};
