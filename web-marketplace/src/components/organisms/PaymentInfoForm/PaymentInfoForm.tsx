import Form from 'components/molecules/Form/Form';
import { useZodForm } from 'components/molecules/Form/hook/useZodForm';

import {
  CustomerInfo,
  CustomerInfoProps,
} from './PaymentInfoForm.CustomerInfo';
import {
  paymentInfoFormSchema,
  PaymentInfoFormSchemaType,
} from './PaymentInfoForm.schema';
import { PaymentOptionsType } from './PaymentInfoForm.types';

type PaymentInfoFormProps = {
  paymentOption: PaymentOptionsType;
  onSubmit: (values: PaymentInfoFormSchemaType) => Promise<void>;
} & CustomerInfoProps;

export const PaymentInfoForm = ({
  paymentOption,
  wallet,
  accountEmail,
  accountName,
  onSubmit,
}: PaymentInfoFormProps) => {
  const form = useZodForm({
    schema: paymentInfoFormSchema(paymentOption),
    defaultValues: {
      email: accountEmail,
      name: accountName,
      createAccount: true,
    },
    mode: 'onBlur',
  });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <CustomerInfo
        paymentOption={paymentOption}
        wallet={wallet}
        accountEmail={accountEmail}
        accountName={accountName}
      />
    </Form>
  );
};
