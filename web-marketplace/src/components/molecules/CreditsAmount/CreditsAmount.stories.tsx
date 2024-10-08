import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';
import { createChooseCreditsFormSchema } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';

import { CreditsAmount } from './CreditsAmount';
import { CREDITS_AMOUNT, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import {
  allowedDenoms,
  cardSellOrders,
  cryptoCurrencies,
  cryptoSellOrders,
} from './CreditsAmount.mock';
import { Currency } from './CreditsAmount.types';

export default {
  title: 'Marketplace/Molecules/CreditsAmount',
  component: CreditsAmount,
} as Meta<typeof CreditsAmount>;

type Story = StoryObj<typeof CreditsAmount>;

const CreditsWithForm = (args: any) => {
  const defaultCryptoCurrency = cryptoCurrencies[0];
  const initCurrency =
    args.paymentOption === PAYMENT_OPTIONS.CARD
      ? { askDenom: 'usd', askBaseDenom: 'usd' }
      : defaultCryptoCurrency;
  const [currency] = useState<Currency>(initCurrency);
  const [spendingCap, setSpendingCap] = useState(0);
  const [creditsAvailable, setCreditsAvailable] = useState(0);

  const chooseCreditsFormSchema = createChooseCreditsFormSchema({
    creditsAvailable,
    spendingCap,
  });
  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      [CURRENCY_AMOUNT]: 1,
      [CREDITS_AMOUNT]: 1,
    },
    mode: 'onChange',
  });
  const filteredCryptoSellOrders = cryptoSellOrders.filter(
    order => order.askDenom === initCurrency.askDenom,
  );
  const card = args.paymentOption === PAYMENT_OPTIONS.CARD;
  const orderedSellOrders = card
    ? cardSellOrders.sort((a, b) => a.usdPrice - b.usdPrice)
    : filteredCryptoSellOrders?.sort(
        (a, b) => Number(a.askAmount) - Number(b.askAmount),
      ) || [];

  return (
    <Form form={form as any} onSubmit={form.handleSubmit as any}>
      <CreditsAmount
        {...args}
        currency={currency}
        spendingCap={spendingCap}
        setSpendingCap={setSpendingCap}
        creditsAvailable={creditsAvailable}
        setCreditsAvailable={setCreditsAvailable}
        filteredCryptoSellOrders={filteredCryptoSellOrders}
        card={card}
        orderedSellOrders={orderedSellOrders}
      />
    </Form>
  );
};

export const CreditsAmountCard: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCard.args = {
  paymentOption: PAYMENT_OPTIONS.CARD,
  cardSellOrders,
  cryptoCurrencies,
  allowedDenoms,
};

export const CreditsAmountCrypto: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCrypto.args = {
  paymentOption: PAYMENT_OPTIONS.CRYPTO,
  cardSellOrders,
  cryptoCurrencies,
  allowedDenoms,
};
