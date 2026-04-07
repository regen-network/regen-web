import { useMemo } from 'react';

import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

export const useDaoOrganizations = () => {
  const { activeAccount } = useAuth();
  const { loginDisabled, accountByAddr } = useWallet();

  const daos = useMemo(
    () =>
      (loginDisabled
        ? accountByAddr?.daosByAssignmentAccountIdAndDaoAddress?.nodes
        : activeAccount?.daosByAssignmentAccountIdAndDaoAddress?.nodes) ?? [],
    [activeAccount, accountByAddr, loginDisabled],
  );

  // return all DAOs that are organizations
  return useMemo(
    () => daos.filter(dao => !!dao?.organizationByDaoAddress),
    [daos],
  );
};
