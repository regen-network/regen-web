import { useOutletContext } from 'react-router-dom';

import { AllProfilePageQuery } from 'generated/sanity-graphql';

import { AccountOption } from 'components/organisms/DashboardNavigation/DashboardNavigation.types';

type DashboardContextType = {
  isIssuer: boolean;
  isCreditClassCreator: boolean;
  isCreditClassAdmin?: boolean;
  isProjectAdmin: boolean;
  sanityProfilePageData?: AllProfilePageQuery;
  selectedAccountId?: string;
  selectedAccount?: AccountOption;
  isOrganizationDashboard?: boolean;
  selectedAccountRoleName?: string;
  selectedAccountOnChainRoleId?: string;
  selectedAccountAddress?: string;
  selectedAccountRoleAccountId?: string;
  organizationRole?: string;
  isOrganizationOwner: boolean;
  isOrganizationAdmin: boolean;
  isOrganizationEditor: boolean;
  isOrganizationAuthor: boolean;
  isOrganizationViewer: boolean;
};

export const useDashboardContext = (): DashboardContextType => {
  return useOutletContext<DashboardContextType>();
};
