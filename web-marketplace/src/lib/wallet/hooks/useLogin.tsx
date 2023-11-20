import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { LoginParams, SignArbitraryType } from 'lib/wallet/wallet';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
};

export const useLogin = ({ signArbitrary, setError }: Params) => {
  const reactQueryClient = useQueryClient();

  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const login = useCallback(
    async ({ walletConfig, wallet }: LoginParams): Promise<void> => {
      try {
        if (wallet?.address && signArbitrary && token) {
          // Step 2: Retrieve a nonce for the user
          const nonceRes = await fetch(
            `${apiUri}/marketplace/v1/wallet-auth/nonce?` +
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
            wallet,
            nonce: nonce || '',
          });

          // Step 4: Submit the signature to the login endpoint
          const { user } = await postData({
            url: `${apiUri}/marketplace/v1/wallet-auth/login`,
            data: { signature },
            token,
          });
          const accountId = user?.accountId;
          if (accountId) {
            await reactQueryClient.invalidateQueries({
              queryKey: [GET_ACCOUNTS_QUERY_KEY],
            });
          }
        }
      } catch (e) {
        setError(e);
      }
    },
    [signArbitrary, token, reactQueryClient, setError],
  );

  return login;
};
