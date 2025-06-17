import { useOutletContext } from 'react-router-dom';

import { AllProfilePageQuery } from 'generated/sanity-graphql';

type DashboardContextType = {
  isIssuer: boolean;
  isCreditClassCreator: boolean;
  isCreditClassAdmin: boolean;
  isProjectAdmin: boolean;
  sanityProfilePageData?: AllProfilePageQuery;
};

export const useDashboardContext = (): DashboardContextType => {
  return useOutletContext<DashboardContextType>();
};
