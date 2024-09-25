import { Currency } from 'web-components/src/components/DenomIconWithCurrency/DenomIconWithCurrency.constants';

import { ORDER_STATUS } from './Order.constants';

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface OrderDataProps {
  project: OrderProjectData;
  order: {
    status: OrderStatus;
    retirementInfo: OrderSummarySectionProps;
    blockchainDetails: OrderSummarySectionProps;
    credits: OrderSummarySectionProps;
    paymentInfo: OrderSummarySectionProps;
  };
}

export type OrderProjectData = {
  name: string;
  date: string;
  placeName: string;
  area: number;
  areaUnit: string;
  imageSrc: string;
  prefinance: boolean;
};

export type RetirementInfoData = {
  tradableCredits: string | null;
  reason: string;
  location: string;
  makeAnonymous: boolean;
};

export type BlockchainDetailsData = {
  purchaseDate: string;
  blockchainRecord: string;
};

export type CreditsData = {
  credits: string;
  price: string;
  denom: Currency;
};

export type PaymentInfoData = {
  nameOnCard: string;
  cardInfo: string;
  denom: Currency;
};

export interface OrderSummarySectionProps {
  icon: React.ReactNode;
  title: string;
  data:
    | CreditsData
    | RetirementInfoData
    | PaymentInfoData
    | BlockchainDetailsData;
}
