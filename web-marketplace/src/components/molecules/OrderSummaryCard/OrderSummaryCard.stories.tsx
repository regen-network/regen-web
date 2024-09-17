import { Meta, StoryObj } from '@storybook/react';

import { allowedDenoms } from '../CreditsAmount/CreditsAmount.mock';
import { OrderSummaryCard } from './OrderSummaryCard';

export default {
  title: 'Marketplace/Molecules/OrderSummaryCard',
  component: OrderSummaryCard,
} as Meta<typeof OrderSummaryCard>;

type Story = StoryObj<typeof OrderSummaryCard>;

const currency = { askDenom: 'usd', askBaseDenom: 'usd' };

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
    currency,
  },
  imageAltText: 'imageAltText',
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
    currency,
  },
  paymentOption: 'card',
  currentBuyingStep: 2,
  paymentMethod: {
    type: 'visa',
    cardNumber: '1234 5678 9012 3456',
  },
  imageAltText: 'imageAltText',
  allowedDenoms,
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
    currency,
  },
  paymentOption: 'card',
  currentBuyingStep: 2,
  paymentMethod: {
    type: 'visa',
    cardNumber: '1234 5678 9012 3456',
  },
  imageAltText: 'imageAltText',
  allowedDenoms,
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
    currency,
  },
  paymentOption: 'crypto',
  imageAltText: 'imageAltText',
  allowedDenoms,
};
