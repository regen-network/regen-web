import { Meta, StoryObj } from '@storybook/react';
import { buyCreditsFormSchema } from 'web-components/src/components/form/BuyCreditsForm/BuyCreditsForm.schema';
import { PAYMENT_OPTIONS } from 'web-components/src/components/form/BuyCreditsForm/BuyCreditsForm.types';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';

import { CreditsAmount } from './CreditsAmount';

export default {
  title: 'Inputs/CreditsAmount',
  component: CreditsAmount,
} as Meta<typeof CreditsAmount>;

type Story = StoryObj<typeof CreditsAmount>;

const CreditsWithForm = (args: any) => {
  const form = useZodForm({
    schema: buyCreditsFormSchema,
    defaultValues: {
      amountCurrency: 1,
      amountCredits: 1,
      cryptoPurchaseOption: PAYMENT_OPTIONS.CARD,
    },
    mode: 'onBlur',
  });
  return (
    <Form form={form} onSubmit={form.handleSubmit}>
      <CreditsAmount {...args} />
    </Form>
  );
};

export const CreditsAmountCard: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCard.args = {
  creditsAvailable: 100,
  paymentOption: PAYMENT_OPTIONS.CARD,
};

export const CreditsAmountCrypto: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCrypto.args = {
  creditsAvailable: 100,
  paymentOption: PAYMENT_OPTIONS.CRYPTO,
};
