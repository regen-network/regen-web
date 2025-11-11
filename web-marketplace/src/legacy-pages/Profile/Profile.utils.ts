export const getDashboardRoute = (isOrg: boolean): string => {
  return isOrg ? '/dashboard/organization' : '/dashboard';
};
