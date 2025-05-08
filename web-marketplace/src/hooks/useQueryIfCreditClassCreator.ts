import { useQuery } from '@tanstack/react-query';

import { useLedger } from 'ledger';
import { getCreditClassCreatorQuery } from 'lib/queries/react-query/ecocredit/getCreditClassCreatorQuery/getCreditClassCreatorQuery';
import { useWallet } from 'lib/wallet/wallet';

type Props = {
  address?: string | null;
};

/**
 * A custom hook that checks if the provided address (or the connected wallet address)
 * is in the list of allowed class creators. If the allowlist feature is disabled, it
 * always returns true.
 *
 * @param address - Optional address to check if it is a credit class creator. If not
 * provided, the connected wallet address will be used. See {@link Props} for more details.
 *
 * @returns A boolean indicating whether the active address can create credit classes.
 */
export function useQueryIfCreditClassCreator({ address }: Props): boolean {
  const { wallet } = useWallet();
  const { queryClient } = useLedger();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;

  const { data: isCreator = false } = useQuery(
    getCreditClassCreatorQuery({
      enabled: !!activeAddress && !!queryClient,
      client: queryClient!,
      request: { activeAddress: activeAddress as string },
    }),
  );

  return isCreator;
}
