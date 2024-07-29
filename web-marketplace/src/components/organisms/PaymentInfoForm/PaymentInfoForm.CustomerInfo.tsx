import { Trans } from '@lingui/macro';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import TextField from 'web-components/src/components/inputs/new/TextField/TextField';
import { Title } from 'web-components/src/components/typography';

import { useAuth } from 'lib/auth/auth';

import { PaymentOptionsType } from './PaymentInfoForm.types';

type CustomerInfoProps = {
  paymentOption: PaymentOptionsType;
};
export const CustomerInfo = ({ paymentOption }: CustomerInfoProps) => {
  const { activeAccount } = useAuth();
  return (
    <Card>
      <div className="flex justify-between">
        <Title variant="h6">
          <Trans>Customer info</Trans>
        </Title>
        {!activeAccount && (
          <OutlinedButton>
            <Trans>log in for faster checkout</Trans>
          </OutlinedButton>
        )}
      </div>
      <TextField
      label={\_(msg\`Your email\`)}
        {...form.register('email')}
        error={!!errors['email']}
        helperText={errors['email']?.message}
      />
    </Card>
  );
};
