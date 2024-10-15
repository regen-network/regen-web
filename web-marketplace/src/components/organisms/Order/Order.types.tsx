import { ORDER_STATUS } from './Order.constants';

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface OrderDataProps {
  project: OrderProjectData;
  order: {
    status: OrderStatus;
    retirementInfo: RetirementInfoData;
    blockchainDetails: BlockchainDetailsData;
    credits: CreditsData;
    paymentInfo: PaymentInfoData;
  };
  className?: string;
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
  askDenom: string;
  askBaseDenom: string;
};

export type PaymentInfoData = {
  nameOnCard: string;
  cardLast4: string;
  cardBrand: string;
  askDenom: string;
  askBaseDenom: string;
};
