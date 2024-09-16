import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  cardSellOrders,
  cryptoSellOrders,
} from 'web-marketplace/src/components/molecules/CreditsAmount/CreditsAmount.mock';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

import { ChooseCreditsForm, Props } from './ChooseCreditsForm';

export default {
  title: 'Marketplace/Organisms/ChooseCreditsForm',
  component: ChooseCreditsForm,
} as Meta<typeof ChooseCreditsForm>;

type Story = StoryObj<typeof ChooseCreditsForm>;

const Template = (args: Props) => {
  const [paymentOption, setPaymentOption] = useState<PaymentOptionsType>(
    PAYMENT_OPTIONS.CARD,
  );
  const [retiring, setRetiring] = useState<boolean>(true);
  return (
    <ChooseCreditsForm
      {...args}
      paymentOption={paymentOption}
      setPaymentOption={setPaymentOption}
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
};
