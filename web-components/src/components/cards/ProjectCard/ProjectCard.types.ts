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
