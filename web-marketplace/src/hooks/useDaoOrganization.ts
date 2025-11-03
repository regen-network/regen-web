import { useMemo } from 'react';

import { useAuth } from 'lib/auth/auth';

export const useDaoOrganization = () => {
  const { activeAccount } = useAuth();

  const daos = useMemo(
    () => activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes ?? [],
    [activeAccount],
  );

  // find the DAO that is an organization
  const dao = useMemo(
    () => daos?.find(dao => !!dao?.organizationByDaoAddress),
    [daos],
  );
  return dao;
};
