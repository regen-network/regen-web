import { useOutletContext } from 'react-router-dom';

type DashboardContextType = {
  isIssuer: boolean;
  isCreditClassCreator: boolean;
  isCreditClassAdmin: boolean;
  isProjectAdmin: boolean;
};

export const useDashboardContext = (): DashboardContextType => {
  return useOutletContext<DashboardContextType>();
};
