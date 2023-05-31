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
