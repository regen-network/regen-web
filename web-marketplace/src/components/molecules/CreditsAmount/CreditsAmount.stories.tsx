import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';
import { createChooseCreditsFormSchema } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import {
  CURRENCIES,
  Currency,
} from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';

import { CreditsAmount } from './CreditsAmount';
import { CREDITS_AMOUNT, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import {
  cardSellOrders,
  cryptoCurrencies,
  cryptoSellOrders,
} from './CreditsAmount.mock';

export default {
  title: 'Marketplace/Molecules/CreditsAmount',
  component: CreditsAmount,
} as Meta<typeof CreditsAmount>;

type Story = StoryObj<typeof CreditsAmount>;

const CreditsWithForm = (args: any) => {
  const defaultCryptoCurrency = cryptoCurrencies[0];
  const initCurrency =
    args.paymentOption === PAYMENT_OPTIONS.CARD
      ? CURRENCIES.usd
      : defaultCryptoCurrency;
  const [currency, setCurrency] = useState<Currency>(initCurrency);
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
    order => order.askDenom === currency,
  );
  return (
    <Form form={form as any} onSubmit={form.handleSubmit as any}>
      <CreditsAmount
        {...args}
        currency={currency}
        setCurrency={setCurrency}
        spendingCap={spendingCap}
        setSpendingCap={setSpendingCap}
        creditsAvailable={creditsAvailable}
        setCreditsAvailable={setCreditsAvailable}
        defaultCryptoCurrency={defaultCryptoCurrency}
        filteredCryptoSellOrders={filteredCryptoSellOrders}
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
};

export const CreditsAmountCrypto: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCrypto.args = {
  paymentOption: PAYMENT_OPTIONS.CRYPTO,
  cardSellOrders,
};
