import { AllowedDenom } from '@regen-network/api/lib/generated/regen/ecocredit/marketplace/v1/state';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

import { ORDER_STATUS } from './Order.constants';

export type OrderStatus = keyof typeof ORDER_STATUS;

export type OrderProps = {
  orderData: OrderData;
  allowedDenoms?: AllowedDenom[];
  className?: string;
};

export interface OrderData {
  project: OrderProjectData;
  order: {
    status: OrderStatus;
    retirementInfo: RetirementInfoData;
    blockchainDetails: BlockchainDetailsData;
    credits: CreditsData;
    paymentInfo: PaymentInfoData;
  };
}

export type OrderProjectData = Pick<
  NormalizeProject,
  | 'name'
  | 'location'
  | 'imgSrc'
  | 'projectPrefinancing'
  | 'place'
  | 'area'
  | 'areaUnit'
> & {
  deliveryDate: string;
};

export type RetirementInfoData = {
  retiredCredits?: boolean;
  reason?: string;
  location?: string;
  makeAnonymous: boolean;
  certificateNodeId?: string;
};

export type BlockchainDetailsData = {
  purchaseDate: string;
  blockchainRecord?: string;
};

export type CreditsData = {
  credits: string | number;
  totalPrice: string | number;
  askDenom: string;
  askBaseDenom: string;
};

export type PaymentInfoData = {
  cardLast4?: string;
  cardBrand?: string;
  askDenom: string;
  askBaseDenom: string;
};
