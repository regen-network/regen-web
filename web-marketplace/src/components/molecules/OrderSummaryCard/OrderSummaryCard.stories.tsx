import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { allowedDenoms } from '../CreditsAmount/CreditsAmount.mock';
import { OrderSummaryCard } from './OrderSummaryCard';
import { order } from './OrderSummaryCard.mock';

export default {
  title: 'Marketplace/Molecules/OrderSummaryCard',
  component: OrderSummaryCard,
} as Meta<typeof OrderSummaryCard>;

type Story = StoryObj<typeof OrderSummaryCard>;

export const Default: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

Default.args = {
  order,
  setCreditsAmount: action('setCreditsAmount'),
  onClickEditCard: action('onClickEditCard'),
  imageAltText: 'imageAltText',
};

export const WithPaymentDetails: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithPaymentDetails.args = {
  order,
  paymentOption: 'card',
  cardDetails: {
    brand: 'visa',
    last4: '3456',
    country: 'US',
  },
  imageAltText: 'imageAltText',
  allowedDenoms,
  setCreditsAmount: action('setCreditsAmount'),
  onClickEditCard: action('onClickEditCard'),
};

export const WithPrefinanceProject: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithPrefinanceProject.args = {
  order: {
    ...order,
    prefinanceProject: true,
  },
  paymentOption: 'card',
  cardDetails: {
    brand: 'visa',
    last4: '3456',
    country: 'US',
  },
  imageAltText: 'imageAltText',
  allowedDenoms,
  setCreditsAmount: action('setCreditsAmount'),
  onClickEditCard: action('onClickEditCard'),
};

export const WithCrypto: Story = {
  render: args => <OrderSummaryCard {...args} />,
};

WithCrypto.args = {
  order,
  paymentOption: 'crypto',
  imageAltText: 'imageAltText',
  allowedDenoms,
  setCreditsAmount: action('setCreditsAmount'),
  onClickEditCard: action('onClickEditCard'),
};
