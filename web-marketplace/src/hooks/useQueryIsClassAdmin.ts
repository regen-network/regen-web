import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getClassesByAdminQuery } from 'lib/queries/react-query/ecocredit/getClassesByAdminQuery/getClassesByAdminQuery';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string | null;
};

export function useQueryIsClassAdmin({ address }: Props): boolean {
  const { ecocreditClient } = useLedger();
  const { wallet } = useWallet();
  const activeAddress = wallet?.address ?? address;

  const { data: classesByAdmin } = useQuery(
    getClassesByAdminQuery({
      enabled: !!activeAddress && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: activeAddress as string },
    }),
  );

  const isClassAdmin = (classesByAdmin?.classes?.length ?? 0) > 0;

  return isClassAdmin;
}
