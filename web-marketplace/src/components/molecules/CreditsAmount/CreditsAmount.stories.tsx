import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import Form from 'web-marketplace/src/components/molecules/Form/Form';
import { useZodForm } from 'web-marketplace/src/components/molecules/Form/hook/useZodForm';
import { PAYMENT_OPTIONS } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.constants';
import { chooseCreditsFormSchema } from 'web-marketplace/src/components/organisms/ChooseCreditsForm/ChooseCreditsForm.schema';

import { CURRENCIES } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { CreditsAmount } from './CreditsAmount';

const creditsAvailable = [
  {
    credits: 1000,
    currency: CURRENCIES.usd,
  },
  {
    credits: 2000,
    currency: CURRENCIES.uregen,
  },
  {
    credits: 3000,
    currency: CURRENCIES.usdc,
  },
  {
    credits: 4000,
    currency: CURRENCIES.usdcaxl,
  },
];

export default {
  title: 'Marketplace/Molecules/CreditsAmount',
  component: CreditsAmount,
} as Meta<typeof CreditsAmount>;

type Story = StoryObj<typeof CreditsAmount>;

const CreditsWithForm = (args: any) => {
  const form = useZodForm({
    schema: chooseCreditsFormSchema,
    defaultValues: {
      amountCurrency: 1,
      amountCredits: 1,
      retiring: true,
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
  creditsAvailable,
  paymentOption: PAYMENT_OPTIONS.CARD,
};

export const CreditsAmountCrypto: Story = {
  render: args => <CreditsWithForm {...args} />,
};

CreditsAmountCrypto.args = {
  creditsAvailable,
  paymentOption: PAYMENT_OPTIONS.CRYPTO,
};
