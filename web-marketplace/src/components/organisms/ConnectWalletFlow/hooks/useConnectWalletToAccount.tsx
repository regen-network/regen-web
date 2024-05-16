import { useCallback, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { useAuth } from 'lib/auth/auth';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getAccountByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { getAccountByIdQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByIdQuery/getAccountByIdQuery.utils';
import { AccountEvent } from 'lib/tracker/types';
import { useTracker } from 'lib/tracker/useTracker';
import { useSignArbitrary } from 'lib/wallet/hooks/useSignArbitrary';
import { useWallet } from 'lib/wallet/wallet';

import {
  ADDRESS_USED_ERROR,
  ADDRESS_USED_WITH_EMAIL_ERROR,
} from 'components/organisms/ConnectWalletFlow/ConnectWalletFlow.constants';

type Params = {
  isConnectModalOpened?: boolean;
  onConnectModalClose: () => void;
  setError: (e: unknown) => void;
  setAddressUsedModalOpen: UseStateSetter<boolean>;
  setAddressUsedWithEmailModalOpen: UseStateSetter<boolean>;
};

export const useConnectWalletToAccount = ({
  isConnectModalOpened,
  onConnectModalClose,
  setError,
  setAddressUsedModalOpen,
  setAddressUsedWithEmailModalOpen,
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
  const { track } = useTracker();

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
            await track<AccountEvent>('connectWallet', {
              id: activeAccount?.id,
              account: wallet.address,
              date: new Date().toUTCString(),
            });
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
          switch (response.error) {
            case ADDRESS_USED_ERROR:
              onConnectModalClose();
              setAddressUsedModalOpen(true);
              break;
            case ADDRESS_USED_WITH_EMAIL_ERROR:
              onConnectModalClose();
              setAddressUsedWithEmailModalOpen(true);
              break;
            default:
              throw Error(response.error);
          }
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
    activeAccount?.id,
    activeAccountId,
    retryCsrfRequest,
    track,
    reactQueryClient,
    onConnectModalClose,
    setAddressUsedModalOpen,
    setAddressUsedWithEmailModalOpen,
    setError,
  ]);

  // Step 5: trigger connect wallet callback whenever wallet address is available and action modal is opened
  const shouldConnectAccount =
    !!activeAccountId &&
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
