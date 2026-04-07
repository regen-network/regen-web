import { useMemo } from 'react';

import type { Dao } from 'generated/graphql';
import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

export const useDaoOrganizations = (): Array<Dao | null> => {
  const { activeAccount } = useAuth();
  const { loginDisabled, accountByAddr } = useWallet();

  const daos: Array<Dao | null> = useMemo(
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
