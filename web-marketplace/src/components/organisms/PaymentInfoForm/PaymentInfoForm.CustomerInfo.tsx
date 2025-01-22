import { useFormContext, useWatch } from 'react-hook-form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Body, Title } from 'web-components/src/components/typography';

import { Wallet } from 'lib/wallet/wallet';

import { PAYMENT_OPTIONS } from 'pages/BuyCredits/BuyCredits.constants';
import { PaymentOptionsType } from 'pages/BuyCredits/BuyCredits.types';

import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';

export type CustomerInfoProps = {
  paymentOption: PaymentOptionsType;
  wallet?: Wallet;
  accountId?: string;
  accountEmail?: string | null;
  accountName?: string;
  login: () => void;
  retiring: boolean;
};

export const CustomerInfo = ({
  paymentOption,
  wallet,
  accountEmail,
  accountName,
  accountId,
  retiring,
  login,
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
    <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
      <div className="flex justify-between flex-wrap gap-20">
        <Title variant="h6">
          <Trans>Customer info</Trans>
        </Title>
        {!accountId && !wallet?.address && (
          <OutlinedButton onClick={login} className="text-xs py-[9px] px-20">
            <Trans>log in for faster checkout</Trans>
          </OutlinedButton>
        )}
      </div>
      {retiring && (
        <TextField
          label={_(msg`Your name`)}
          description={_(
            msg`This name will appear on the retirement certificate. It is also your user profile name.`,
          )}
          {...register('name')}
          error={!!errors['name']}
          helperText={errors['name']?.message}
          disabled={!!accountName}
        />
      )}
      <TextField
        className={!accountId && !wallet?.address ? 'mb-30' : ''}
        label={_(msg`Your email`)}
        description={
          !!wallet?.address && !accountEmail ? (
            <Trans>
              Input an email address to receive a receipt of your purchase.
              <i>
                Note: You will receive an email with instructions to link this
                email to your account, allowing for easier access going forward,
                if desired.
              </i>
            </Trans>
          ) : paymentOption === PAYMENT_OPTIONS.CARD ? (
            _(
              msg`We need an email address to send you a receipt of your purchase.`,
            )
          ) : (
            _(
              msg`We will send your receipt to the email address below, which is already linked to your account.`,
            )
          )
        }
        {...register('email')}
        error={!!errors['email']}
        helperText={errors['email']?.message}
        disabled={!!accountEmail}
        optional={paymentOption === PAYMENT_OPTIONS.CRYPTO}
      />
      {!accountId && !wallet?.address && (
        <CheckboxLabel
          checked={createAccount}
          label={
            <Body size="sm" className="text-grey-700">
              <Trans>
                Yes, please create an account for me so I can easily see my
                purchase details and retirement certificate when I log in
              </Trans>
            </Body>
          }
          {...register('createAccount')}
        />
      )}
    </Card>
  );
};
