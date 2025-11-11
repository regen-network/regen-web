import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getClassesByAdminQuery } from 'lib/queries/react-query/ecocredit/getClassesByAdminQuery/getClassesByAdminQuery';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string | null;
};

export function useQueryIsClassAdmin({ address }: Props): boolean {
  const { queryClient } = useLedger();

  const { data: classesByAdmin } = useQuery(
    getClassesByAdminQuery({
      enabled: !!address && !!queryClient,
      client: queryClient,
      request: { admin: address as string },
    }),
  );

  const isClassAdmin = (classesByAdmin?.classes?.length ?? 0) > 0;

  return isClassAdmin;
}
