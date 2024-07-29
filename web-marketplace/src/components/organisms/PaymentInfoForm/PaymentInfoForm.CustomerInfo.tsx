import { useFormContext, useWatch } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { L } from '@lingui/react/dist/shared/react.e5f95de8';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Title } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';
import { Wallet } from 'lib/wallet/wallet';

import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';
import { PaymentOptionsType } from './PaymentInfoForm.types';

export type CustomerInfoProps = {
  paymentOption: PaymentOptionsType;
  wallet?: Wallet;
  accountEmail?: string;
  accountName?: string;
};
export const CustomerInfo = ({
  paymentOption,
  wallet,
  accountEmail,
  accountName,
}: CustomerInfoProps) => {
  const { _ } = useLingui();
  const ctx = useFormContext<PaymentInfoFormSchemaType>();
  const { register, formState, control } = ctx;
  const { errors } = formState;

  const createAccount = useWatch({
    control: control,
    name: 'createAccount',
  });

  return (
    <Card>
      <div className="flex justify-between">
        <Title variant="h6">
          <Trans>Customer info</Trans>
        </Title>
        {!accountEmail && !wallet && (
          <OutlinedButton>
            <Trans>log in for faster checkout</Trans>
          </OutlinedButton>
        )}
      </div>
      <TextField
        label={_(msg`Your name`)}
        description={_(
          msg`This name will be used on the retirement certificate and profile, unless you choose to retire anonymously on the following step.`,
        )}
        {...register('name')}
        error={!!errors['name']}
        helperText={errors['name']?.message}
      />
      <TextField
        label={_(msg`Your email`)}
        description={_(
          msg`We need an email address to send you a receipt of your purchase.`,
        )}
        {...register('email')}
        error={!!errors['email']}
        helperText={errors['email']?.message}
      />
      <CheckboxLabel
        checked={createAccount}
        label={_(
          msg`Yes, please create an account for me so I can easily see my purchase details and retirement certificate when I log in`,
        )}
        {...register('createAccount')}
      />
    </Card>
  );
};
