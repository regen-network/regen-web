import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { LoginParams, SignArbitraryType, Wallet } from 'lib/wallet/wallet';

import { chainInfo } from '../chainInfo/chainInfo';
import { getNonce, getWallet } from '../wallet.utils';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  setWallet: UseStateSetter<Wallet>;
};

export const useAddAddress = ({
  signArbitrary,
  setError,
  setWallet,
}: Params) => {
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const addAddress = useCallback(
    async ({
      walletConfig,
      walletConnect,
      wallet,
    }: LoginParams): Promise<void> => {
      try {
        if (wallet?.address && signArbitrary && token) {
          // Get nonce for the current authenticated user
          const nonce = await getNonce({ userAddress: wallet.address, token });

          // Get new user wallet
          const walletClient = await walletConfig?.getClient({
            chainInfo,
            walletConnect,
          });
          const newWallet = await getWallet({ walletClient, walletConfig });

          if (newWallet) {
            // Generate the signature for the addresses request
            const signature = await signArbitrary({
              walletConfig,
              walletConnect,
              wallet: newWallet,
              nonce,
              addAddr: true,
            });

            // Submit the signature to the addresses endpoint
            await fetch(`${apiUri}/web3auth/addresses`, {
              body: JSON.stringify({ signature }),
              method: 'POST',
              credentials: 'include',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token,
              },
            });

            // Set wallet to new one
            setWallet(newWallet);
          }
        }
      } catch (e) {
        console.log(e);
        setError(e);
      }
    },
    [signArbitrary, token, setWallet, setError],
  );

  return addAddress;
};
