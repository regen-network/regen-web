import { useMemo } from 'react';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

export const useDaoOrganization = () => {
  const { activeAccount } = useAuth();
  const { loginDisabled, accountByAddr } = useWallet();

  const daos = useMemo(
    () =>
      (loginDisabled
        ? accountByAddr?.daosByAssignmentAccountIdAndDaoAddress?.nodes
        : activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes) ?? [],
    [activeAccount, accountByAddr, loginDisabled],
  );

  // find the DAO that is an organization
  const dao = useMemo(
    () => daos?.find(dao => !!dao?.organizationByDaoAddress),
    [daos],
  );

  return dao;
};
