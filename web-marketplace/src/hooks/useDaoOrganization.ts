import { useAuth } from 'lib/auth/auth';
import { useMemo } from 'react';

export const useDaoOrganization = () => {
  const { activeAccount } = useAuth();

  const daos =
    activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes ?? [];

  // find the DAO that is an organization
  const dao = useMemo(
    () => daos?.find(dao => !!dao?.organizationByDaoAddress),
    [daos],
  );
  return dao;
};
