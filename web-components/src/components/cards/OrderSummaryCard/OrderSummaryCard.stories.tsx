import { Meta, StoryObj } from '@storybook/react';
import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { OrderSummaryCard } from './OrderSummaryCard';
import { orderSummaryCommonProps } from './OrderSummaryCard.mock';

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
    prefinanceProject: false,
    pricePerCredit: 2,
    credits: 50,
    currency: CURRENCIES.usd,
  },
  ...orderSummaryCommonProps,
};

export const WithPaymentDetails: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithPaymentDetails.args = {
  order: {
    image: '/coorong.png',
    projectName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    prefinanceProject: false,
    pricePerCredit: 2,
    credits: 50,
    currency: CURRENCIES.usd,
  },
  currentBuyingStep: 2,
  paymentMethod: {
    type: 'visa',
    cardNumber: '1234 5678 9012 3456',
  },
  ...orderSummaryCommonProps,
};

export const WithPrefinanceProject: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithPrefinanceProject.args = {
  order: {
    image: '/coorong.png',
    projectName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    prefinanceProject: true,
    pricePerCredit: 2,
    credits: 50,
    currency: 'usd',
  },
  currentBuyingStep: 2,
  paymentMethod: {
    type: 'visa',
    cardNumber: '1234 5678 9012 3456',
  },
  ...orderSummaryCommonProps,
};

export const WithCrypto: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithCrypto.args = {
  order: {
    image: '/coorong.png',
    projectName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    prefinanceProject: false,
    pricePerCredit: 2,
    credits: 50,
    currency: CURRENCIES.uregen,
  },
  ...orderSummaryCommonProps,
};
