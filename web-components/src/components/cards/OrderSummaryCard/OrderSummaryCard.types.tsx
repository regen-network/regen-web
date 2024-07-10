import { CurrencyCode } from 'web-components/src/utils/currency';

export interface OrderProps {
  projectName: string;
  pricePerCredit: number;
  credits: number;
  currency: CurrencyCode;
  image: string;
}

export interface OrderSummaryProps {
  order: OrderProps;
  // TO-DO remove currentBuyingStep prop and get the current step from the context
  // this cound be a number or a string (choose credits | payment info | retirement | complete |)
  currentBuyingStep: number;
  // TO-DO: get from the context
  paymentMethod: {
    type: 'visa' | 'mastercard';
    cardNumber: string;
  };
}

export interface PaymentMethod {
  type: 'visa' | 'mastercard';
  cardNumber: string;
}
