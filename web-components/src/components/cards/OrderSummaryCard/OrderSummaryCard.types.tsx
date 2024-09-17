import { Currency } from 'web-marketplace/src/components/atoms/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { ProjectCardBodyTextsMapping } from '../ProjectCard/ProjectCard.types';

export interface OrderProps {
  projectName: string;
  prefinanceProject: boolean;
  pricePerCredit: number;
  credits: number;
  currency: Currency;
  image: string;
}

export interface OrderSummaryProps {
  title: string;
  order: OrderProps;
  // TO-DO remove currentBuyingStep prop and get the current step from the context
  // this cound be a number or a string (choose credits | payment info | retirement | complete |)
  currentBuyingStep: number;
  // TO-DO: get from the context
  paymentMethod: {
    type: 'visa' | 'mastercard';
    cardNumber: string;
  };
  headers: {
    project: string;
    pricePerCredit: string;
    credits: string;
    totalPrice: string;
    payment: string;
  };
  ariaLabels: {
    editableCredits: string;
    changePaymentCard: string;
    editButtonAriaLabel: string;
  };
  editableUpdateButtonText: string;
  endingInText: string;
  bodyTexts: ProjectCardBodyTextsMapping;
  imageAltText: string;
  onClickEditCard: () => void;
}

export interface PaymentMethod {
  type: 'visa' | 'mastercard' | 'crypto';
  cardNumber: string;
}
