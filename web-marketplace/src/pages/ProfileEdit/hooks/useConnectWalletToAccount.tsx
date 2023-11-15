import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { useAuth } from 'lib/auth/auth';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { SignArbitraryType, useWallet } from 'lib/wallet/wallet';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  hasKeplrAccount: boolean;
};

export const useConnectWalletToAccount = ({
  signArbitrary,
  setError,
  hasKeplrAccount,
}: Params) => {
  const { activeAccountId, activeAccount, loading } = useAuth();
  const { wallet, walletConfig } = useWallet();
  const reactQueryClient = useQueryClient();

  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const connectWalletToAccount = useCallback(async (): Promise<void> => {
    try {
      if (
        !loading &&
        !hasKeplrAccount &&
        wallet?.address &&
        signArbitrary &&
        token
      ) {
        // Step 2: Generate the signature for keplr wallet connect request
        const signature = await signArbitrary({
          walletConfig,
          wallet,
          nonce: activeAccount?.nonce || '',
          connectWallet: true,
        });

        // Step 3: Submit the signature for keplr wallet connect endpoint
        await postData({
          url: `${apiUri}/marketplace/v1/web3auth/connect-wallet`,
          data: { signature, accountId: activeAccountId },
          token,
        });

        // Step 4: Refresh active account
        await reactQueryClient.invalidateQueries({
          queryKey: getAccountByAddrQueryKey({ addr: wallet?.address }),
        });
        await reactQueryClient.invalidateQueries({
          queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
        });
      }
    } catch (e) {
      setError(e);
    }
  }, [
    loading,
    hasKeplrAccount,
    wallet,
    signArbitrary,
    token,
    walletConfig,
    activeAccount?.nonce,
    activeAccountId,
    reactQueryClient,
    setError,
  ]);

  return connectWalletToAccount;
};
