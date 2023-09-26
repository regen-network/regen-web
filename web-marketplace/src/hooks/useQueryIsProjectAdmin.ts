import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getProjectsByAdminQuery } from 'lib/queries/react-query/ecocredit/getProjectsByAdmin/getProjectsByAdmin';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string;
};

export function useQueryIsProjectAdmin({ address }: Props) {
  const { ecocreditClient } = useLedger();
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;

  const { data: projectsByAdmin, isFetching } = useQuery(
    getProjectsByAdminQuery({
      enabled: !!address && !!ecocreditClient,
      client: ecocreditClient,
      request: { admin: address ?? walletAddress },
    }),
  );

  const isProjectAdmin = (projectsByAdmin?.projects?.length ?? 0) > 0;

  return { isProjectAdmin, isLoadingIsProjectAdmin: isFetching };
}
