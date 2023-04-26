import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { LoginParams, SignArbitraryType } from 'lib/wallet/wallet';

import { chainInfo } from '../chainInfo/chainInfo';
import { getNonce } from '../wallet.utils';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useAddAddress = ({
  signArbitrary,
  setError,
  setAccountId,
  walletConfigRef,
  walletConnect,
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
          const nonce = await getNonce({ userAddress: wallet.address, token });

          // Step 3: Generate the signature for the addresses request
          const signature = await signArbitrary({
            walletConfig,
            walletConnect,
            wallet,
            nonce,
            addAddr: true,
          });

          const walletClient = await walletConfigRef.current?.getClient({
            chainInfo,
            walletConnect,
          });

          // Step 4: Submit the signature to the addresses endpoint
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
        }
      } catch (e) {
        console.log(e);
        setError(e);
      }
    },
    [token, signArbitrary, setError, setAccountId],
  );

  return addAddress;
};
