import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getClassesByAdminQuery } from 'lib/queries/react-query/ecocredit/getClassesByAdminQuery/getClassesByAdminQuery';
import { useWallet } from 'lib/wallet/wallet';

export function useQueryIsClassAdmin(): boolean {
  const { ecocreditClient } = useLedger();
  const { wallet } = useWallet();
  const address = wallet?.address;

  const { data: classesByAdmin } = useQuery(
    getClassesByAdminQuery({
      enabled: !!address && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: address },
    }),
  );

  const isClassAdmin = (classesByAdmin?.classes?.length ?? 0) > 0;

  return isClassAdmin;
}
