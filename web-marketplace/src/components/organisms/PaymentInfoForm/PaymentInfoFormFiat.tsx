import { useElements, useStripe } from '@stripe/react-stripe-js';

import { PaymentInfoForm, PaymentInfoFormProps } from './PaymentInfoForm';

type Props = Omit<PaymentInfoFormProps, 'stripe' | 'elements'>;

export const PaymentInfoFormFiat = (props: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  return <PaymentInfoForm {...props} stripe={stripe} elements={elements} />;
};
