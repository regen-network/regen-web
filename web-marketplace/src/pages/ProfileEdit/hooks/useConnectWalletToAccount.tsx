import { useCallback, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { apiUri } from 'lib/apiUri';
import { useAuth } from 'lib/auth/auth';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { useSignArbitrary } from 'lib/wallet/hooks/useSignArbitrary';
import { useWallet } from 'lib/wallet/wallet';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';

type Params = {
  isConnectModalOpened?: boolean;
  setError: (e: unknown) => void;
};

export const useConnectWalletToAccount = ({
  isConnectModalOpened,
  setError,
}: Params) => {
  const { activeAccountId, activeAccount, loading } = useAuth();
  const { wallet, walletConfig } = useWallet();
  const reactQueryClient = useQueryClient();
  const isConnectingWalletRef = useRef(false);
  const hasKeplrAccount = !!activeAccount?.addr;
  const retryCsrfRequest = useRetryCsrfRequest();
  const signArbitrary = useSignArbitrary({
    setError,
  });

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
        const response = await postData({
          url: `${apiUri}/marketplace/v1/wallet-auth/connect-wallet`,
          data: { signature, accountId: activeAccountId },
          token,
          retryCsrfRequest,
          onSuccess: async () => {
            // Step 4: Refresh active account
            await reactQueryClient.invalidateQueries({
              queryKey: getAccountByAddrQueryKey({ addr: wallet?.address }),
            });
            await reactQueryClient.invalidateQueries({
              queryKey: getAccountByIdQueryKey({ id: activeAccountId }),
            });
          },
        });

        if (response.error) {
          throw Error(response.error);
        }
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

  // Step 5: trigger connect wallet callback whenever wallet address is available and action modal is opened
  const shouldConnectAccount =
    !loading &&
    !hasKeplrAccount &&
    wallet?.address &&
    token &&
    isConnectModalOpened;

  const connectWalletCallback = useCallback(async () => {
    isConnectingWalletRef.current = true;
    await connectWalletToAccount();
    isConnectingWalletRef.current = false;
  }, [connectWalletToAccount]);

  useEffect(() => {
    if (shouldConnectAccount && !isConnectingWalletRef.current) {
      connectWalletCallback();
    }
  }, [connectWalletCallback, shouldConnectAccount]);
};
