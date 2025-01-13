import { useElements, useStripe } from '@stripe/react-stripe-js';

import { AgreePurchaseForm, AgreePurchaseFormProps } from './AgreePurchaseForm';

type Props = Omit<AgreePurchaseFormProps, 'stripe' | 'elements'>;
export const AgreePurchaseFormFiat = (props: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <AgreePurchaseForm
      {...props}
      stripe={stripe}
      elements={elements}
      isCardPayment
    />
  );
};
