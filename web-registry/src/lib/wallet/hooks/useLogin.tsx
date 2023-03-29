import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { LoginParams, SignArbitraryType } from 'lib/wallet/wallet';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useLogin = ({ signArbitrary, setError, setAccountId }: Params) => {
  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const login = useCallback(
    async ({
      walletConfig,
      walletConnect,
      wallet,
    }: LoginParams): Promise<void> => {
      try {
        if (wallet?.address && signArbitrary && token) {
          // Step 2: Retrieve a nonce for the user
          const nonceRes = await fetch(
            `${apiUri}/web3auth/nonce?` +
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

          // Step 3: Generate the signature for the login request
          const signature = await signArbitrary({
            walletConfig,
            walletConnect,
            wallet,
            nonce: nonce || '',
          });

          // Step 4: Submit the signature to the login endpoint
          const loginRes = await fetch(`${apiUri}/web3auth/login`, {
            body: JSON.stringify({ signature }),
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': token,
            },
          });
          const { user } = await loginRes.json();

          const accountId = user?.id;
          if (accountId) setAccountId(accountId);
        }
      } catch (e) {
        setError(e);
      }
    },
    [token, signArbitrary, setError, setAccountId],
  );

  return login;
};
