import { ButtonType } from '../../../types/shared/buttonType';
import { StandardInfo } from '../../../utils/format';

interface Info extends StandardInfo {
  url?: string | null;
}

interface CreditClassInfo extends Info {
  standard: boolean;
}

export interface PurchaseInfo {
  units?: number;
  vintageId?: string;
  vintageMetadata?: any;
  vintagePeriod?: string;
  creditClass?: CreditClassInfo;
  methodology?: Info;
  projectType?: string;
  sellInfo?: {
    avgPricePerTon?: number;
    avgPricePerTonLabel: string;
    creditsAvailable: number;
    creditsAvailableForUser: number;
    denomLogo?: JSX.Element;
  };
}

export type ProjectPrefinancing = {
  isPrefinanceProject: boolean;
  price: string;
  estimatedIssuance: string;
  stripePaymentLink: string;
};

export type ProjectCardBodyTextsMapping = {
  comingSoon: string;
  creditsPurchased: string;
  viewDetails: string;
  errorCardPrice: string;
  soldOut: string;
  avgPriceLabel: string;
  avgPriceTooltip: string;
  prefinance: string;
  price: string;
  estimatedIssuance: string;
  creditsAvailable: string;
  prefinancePriceTooltip: string;
  estimatedIssuanceTooltip: string;
};

export type ProjectCardTitlesMapping = {
  vintageId: string;
  vintageIdWithSerial: string;
  vintagePeriod: string;
  creditClass: string;
  methodology: string;
  projectType: string;
  additionalCertifications: string;
};

export type ProjectCardButtonsMapping = {
  default: ButtonType;
  prefinance: ButtonType;
  view: ButtonType;
};
