import { useOutletContext } from 'react-router-dom';

import { AllProfilePageQuery } from 'generated/sanity-graphql';

import { DashboardNavAccount } from './Dashboard.types';

type DashboardContextType = {
  isIssuer: boolean;
  isCreditClassCreator: boolean;
  isCreditClassAdmin?: boolean;
  sanityProfilePageData?: AllProfilePageQuery;
  selectedAccount?: DashboardNavAccount;
  isOrganizationDashboard?: boolean;
  selectedAccountAddress?: string;
  organizationRole?: string;
  organizationDaoAddress?: string;
  organizationRbamAddress?: string;
  organizationProfile?: {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
    bgImage?: string | null;
    twitterLink?: string | null;
    websiteLink?: string | null;
  } | null;
  isOrganizationOwner: boolean;
  isOrganizationAdmin: boolean;
  isOrganizationEditor: boolean;
  isOrganizationAuthor: boolean;
  isOrganizationViewer: boolean;
  feeGranter?: string;
};

export const useDashboardContext = (): DashboardContextType => {
  return useOutletContext<DashboardContextType>();
};
