import { Meta, StoryObj } from '@storybook/react';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import { createChooseCreditsFormSchema } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { CreditsAmount } from './CreditsAmount';
import { CREDITS_AMOUNT, CURRENCY_AMOUNT } from './CreditsAmount.constants';
import { creditDetails } from './CreditsAmount.mock';

const chooseCreditsFormSchema = createChooseCreditsFormSchema({
  creditsCap: 100,
  spendingCap: 1000,
});

export default {
  title: 'Marketplace/Molecules/CreditsAmount',
  component: CreditsAmount,
} as Meta<typeof CreditsAmount>;

type Story = StoryObj<typeof CreditsAmount>;

const CreditsWithForm = (args: any) => {
  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      [CURRENCY_AMOUNT]: 1,
      [CREDITS_AMOUNT]: 1,
      retiring: true,
    },
    mode: 'onChange',
  });
  return (
    <Form form={form as any} onSubmit={form.handleSubmit as any}>
      <CreditsAmount {...args} />
    </Form>
  );
};

export const CreditsAmountCard: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCard.args = {
  creditDetails,
  paymentOption: PAYMENT_OPTIONS.CARD,
  currency: CURRENCIES.usd,
  setCurrency: () => {},
};

export const CreditsAmountCrypto: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCrypto.args = {
  creditDetails,
  paymentOption: PAYMENT_OPTIONS.CRYPTO,
  currency: CURRENCIES.usd,
  setCurrency: () => {},
};
