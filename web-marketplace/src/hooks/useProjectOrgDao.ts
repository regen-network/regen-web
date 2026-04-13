import { useMemo } from 'react';

import { useDaoOrganizations } from './useDaoOrganizations';

export const useProjectOrgDao = ({
  projectOrgId,
}: {
  projectOrgId?: string | null;
}) => {
  const daoOrganizations = useDaoOrganizations();
  // Find the user's org that owns this project
  const orgDao = useMemo(
    () =>
      projectOrgId
        ? daoOrganizations.find(
            dao => dao?.organizationByDaoAddress?.id === projectOrgId,
          )
        : undefined,
    [daoOrganizations, projectOrgId],
  );
  return orgDao;
};
