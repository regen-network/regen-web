import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import {
  allowedDenoms,
  cardSellOrders,
  cryptoSellOrders,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';

import { ChooseCreditsForm, Props } from './ChooseCreditsForm';

export default {
  title: 'Marketplace/Organisms/ChooseCreditsForm',
  component: ChooseCreditsForm,
} as Meta<typeof ChooseCreditsForm>;

type Story = StoryObj<typeof ChooseCreditsForm>;

const Template = (args: Props) => {
  const [retiring, setRetiring] = useState<boolean>(true);
  return (
    <ChooseCreditsForm
      {...args}
      retiring={retiring}
      setRetiring={setRetiring}
    />
  );
};
export const ChooseCredits: Story = {
  render: args => <Template {...args} />,
};

ChooseCredits.args = {
  cryptoSellOrders,
  cardSellOrders,
  allowedDenoms,
  onPrev: action('prev'),
  isConnected: true,
  setupWalletModal: action('setupWalletModal'),
  paymentOptionCryptoClicked: false,
  setPaymentOptionCryptoClicked: () => {},
  goToPaymentInfo: () => {},
  userBalance: 100,
  isUserBalanceLoading: false,
};
