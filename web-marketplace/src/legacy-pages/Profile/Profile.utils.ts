export const getDashboardRoute = (orgDaoAddress?: string | null): string => {
  return orgDaoAddress
    ? `/dashboard/organization/${orgDaoAddress}`
    : '/dashboard';
};
