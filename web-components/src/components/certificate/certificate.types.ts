import { LinkType } from '../../types/shared/linkType';

export interface StakeholderInfo {
  companyName: string;
  personName: string;
  personRole: string;
  label: string;
}

export type ItemLink = {
  name: string;
  link: LinkType;
};

export type CertificateType = {
  date: string | Date;
  txHash: LinkType;
  certificateTitle: string;
  certificateIcon?: JSX.Element;
  creditsUnits: number;
  creditUnitName?: string;
  equivalentTonsCO2?: number;
  itemLinks: ItemLink[];
  retirementReason?: string;
  retirementLocation?: string;
  batchStartDates?: string[];
  batchEndDates?: string[];
};
