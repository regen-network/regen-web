import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { useAuth } from 'lib/auth/auth';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { SignArbitraryType, useWallet } from 'lib/wallet/wallet';
import { WalletType } from 'lib/wallet/walletsConfig/walletsConfig.types';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
};

export const useConnectKeplrWallet = ({ signArbitrary, setError }: Params) => {
  const { activeAccountId } = useAuth();
  const { wallet, walletConfig, connect } = useWallet();

  const reactQueryClient = useQueryClient();

  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const connectWallet = useCallback(async (): Promise<void> => {
    try {
      if (wallet?.address && signArbitrary && token) {
        // Step 2: Retrieve a nonce for the user
        const nonceRes = await fetch(
          `${apiUri}/marketplace/v1/web3auth/nonce?` +
            new URLSearchParams({
              userAddress: wallet.address,
            }),
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'X-CSRF-TOKEN': token,
            },
          },
        );
        const { nonce } = await nonceRes.json();

        // Step 3: Generate the signature for keplr wallet connect request
        const signature = await signArbitrary({
          walletConfig,
          wallet,
          nonce: nonce || '',
          addAddr: true,
        });

        // Step 4: Submit the signature for keplr wallet connect endpoint
        await postData({
          url: `${apiUri}/marketplace/v1/web3auth/connect-wallet`,
          data: { signature, accountId: activeAccountId },
          token,
        });

        // Step 5: Refresh user accounts
        await reactQueryClient.invalidateQueries({
          queryKey: [GET_ACCOUNTS_QUERY_KEY],
        });
      } else if (connect) {
        connect({ walletType: WalletType.Keplr });
      }
    } catch (e) {
      setError(e);
    }
  }, [
    signArbitrary,
    token,
    activeAccountId,
    reactQueryClient,
    wallet,
    walletConfig,
    connect,
    setError,
  ]);

  return connectWallet;
};
