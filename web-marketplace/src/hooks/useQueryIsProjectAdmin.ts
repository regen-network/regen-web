import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { useWallet } from 'lib/wallet/wallet';

export function useQueryIsProjectAdmin(): boolean {
  const { ecocreditClient } = useLedger();
  const { wallet } = useWallet();
  const address = wallet?.address;

  const { data: projectsByAdmin } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!address && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: address },
    }),
  );

  const isProjectAdmin = (projectsByAdmin?.projects?.length ?? 0) > 0;

  return isProjectAdmin;
}
