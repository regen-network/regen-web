import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import { AgreePurchaseForm } from './AgreePurchaseForm';

export default {
  title: 'Marketplace/Organisms/AgreePurchaseForm',
  component: AgreePurchaseForm,
} as Meta<typeof AgreePurchaseForm>;

type Story = StoryObj<typeof AgreePurchaseForm>;

export const Retirement: Story = {
  render: args => <AgreePurchaseForm {...args} />,
};

Retirement.args = {
  retiring: true,
  country: 'US',
  goToChooseCredits: action('goToChooseCredits'),
  imgSrc: './info-with-hand.svg',
  email: 'john@doe.com',
};

export const NoRetirement: Story = {
  render: args => <AgreePurchaseForm {...args} />,
};

NoRetirement.args = {
  retiring: false,
  goToChooseCredits: action('goToChooseCredits'),
  imgSrc: './info-with-hand.svg',
};

export const AlreadySubscribedToNewsletter: Story = {
  render: args => <AgreePurchaseForm {...args} />,
};

Retirement.args = {
  retiring: true,
  country: 'US',
  goToChooseCredits: action('goToChooseCredits'),
  imgSrc: './info-with-hand.svg',
  email: 'john@doe.com',
  isNewsletterSubscribed: true,
};
