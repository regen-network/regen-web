import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { PaymentMethod } from '@stripe/stripe-js';

import Card from 'web-components/src/components/cards/Card';
import { Body, Title } from 'web-components/src/components/typography';

import { CardInfo } from './PaymentInfoForm.CardInfo';
import { PaymentInfoFormSchemaType } from './PaymentInfoForm.schema';

export type PaymentInfoProps = {
  accountEmail?: string;
  paymentMethods?: Array<PaymentMethod>;
  hasOrCreateActiveAccount?: boolean;
  accountId?: string;
};
export const PaymentInfo = ({
  paymentMethods,
  accountId,
}: PaymentInfoProps) => {
  const ctx = useFormContext<PaymentInfoFormSchemaType>();
  const { register, control, setValue } = ctx;

  const createAccount = useWatch({
    control: control,
    name: 'createAccount',
  });
  const savePaymentMethod = useWatch({
    control: control,
    name: 'savePaymentMethod',
  });

  useEffect(() => {
    setValue('savePaymentMethod', createAccount);
  }, [createAccount, setValue]);

  return (
    <Card className="py-30 px-20 sm:py-50 sm:px-40 border-grey-300">
      <Title className="pb-30" variant="h6">
        Payment info
      </Title>
      {paymentMethods && paymentMethods.length > 0 ? (
        <>TODO</>
      ) : (
        <>
          <CardInfo accountId={accountId} />
        </>
      )}
    </Card>
  );
};
