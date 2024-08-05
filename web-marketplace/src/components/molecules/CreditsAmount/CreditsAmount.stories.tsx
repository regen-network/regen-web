import { Meta, StoryObj } from '@storybook/react';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';
import { chooseCreditsFormSchema } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { CreditsAmount } from './CreditsAmount';
import { PAYMENT_OPTIONS } from './CreditsAmount.types';

export default {
  title: 'molecules/CreditsAmount',
  component: CreditsAmount,
} as Meta<typeof CreditsAmount>;

type Story = StoryObj<typeof CreditsAmount>;

const CreditsWithForm = (args: any) => {
  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      amountCurrency: 1,
      amountCredits: 1,
      cryptoPurchaseOption: PAYMENT_OPTIONS.CARD,
    },
    mode: 'onBlur',
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
