import { useFormContext, useWatch } from 'react-hook-form';

// import { msg, Trans } from '@lingui/macro';
// import { useLingui } from '@lingui/react';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Body, Title } from 'web-components/src/components/typography';

import { Wallet } from 'lib/wallet/wallet';

import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';
import { PaymentOptionsType } from './PaymentInfoForm.types';

export type CustomerInfoProps = {
  paymentOption: PaymentOptionsType;
  wallet?: Wallet;
  accountEmail?: string;
  accountName?: string;
  login: () => void;
};

export const CustomerInfo = ({
  paymentOption,
  wallet,
  accountEmail,
  accountName,
  login,
}: CustomerInfoProps) => {
  // const { _ } = useLingui();
  const ctx = useFormContext<PaymentInfoFormSchemaType>();
  const { register, formState, control } = ctx;
  const { errors } = formState;

  const createAccount = useWatch({
    control: control,
    name: 'createAccount',
  });

  return (
    <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
      <div className="flex justify-between flex-wrap gap-20">
        <Title variant="h6">Customer info</Title>
        {!accountEmail && !wallet && (
          <OutlinedButton onClick={login} className="text-xs py-[9px] px-20">
            log in for faster checkout
          </OutlinedButton>
        )}
      </div>
      <TextField
        label={`Your name`}
        description={`This name will be used on the retirement certificate and profile, unless you choose to retire anonymously on the following step.`}
        {...register('name')}
        error={!!errors['name']}
        helperText={errors['name']?.message}
      />
      <TextField
        className="mb-30"
        label={`Your email`}
        description={
          paymentOption === 'card' ? (
            `We need an email address to send you a receipt of your purchase.`
          ) : accountEmail ? (
            `We will send your receipt to the email address below, which is already linked to your account.`
          ) : (
            <>
              Input an email address to receive a receipt of your purchase.
              <i>
                Take note: we will email you a prompt to associate this email
                with your account for easier future access. This is entirely
                optional.
              </i>
            </>
          )
        }
        {...register('email')}
        error={!!errors['email']}
        helperText={errors['email']?.message}
        disabled={!!accountEmail}
        optional={!!wallet}
      />
      {!accountEmail && !wallet && (
        <CheckboxLabel
          className="font-normal"
          checked={createAccount}
          label={
            <Body size="sm">
              Yes, please create an account for me so I can easily see my
              purchase details and retirement certificate when I log in
            </Body>
          }
          {...register('createAccount')}
        />
      )}
    </Card>
  );
};
