import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { useRetryCsrfRequest } from 'lib/errors/hooks/useRetryCsrfRequest';
import { GET_ACCOUNTS_QUERY_KEY } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.constants';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { LoginParams, SignArbitraryType } from 'lib/wallet/wallet';
import { LoginEvent, Track } from 'lib/tracker/types';

type Params = {
  signArbitrary?: SignArbitraryType;
  logout?: () => Promise<void>;
  setError: UseStateSetter<unknown>;
  track?: Track;
};

export const useLogin = ({
  signArbitrary,
  setError,
  logout,
  track,
}: Params) => {
  const reactQueryClient = useQueryClient();
  const retryCsrfRequest = useRetryCsrfRequest();

  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const login = useCallback(
    async ({
      walletConfig,
      wallet,
      doLogout = false,
    }: LoginParams): Promise<void> => {
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

          if (signature) {
            // This is used for logging out of the previous account when switching to a new account in Keplr
            if (logout && doLogout) await logout();

            // Step 4: Submit the signature to the login endpoint
            const res = await postData({
              url: `${apiUri}/marketplace/v1/wallet-auth/login`,
              data: { signature },
              token,
              retryCsrfRequest,
              onSuccess: async () =>
                await reactQueryClient.invalidateQueries({
                  queryKey: [GET_ACCOUNTS_QUERY_KEY],
                }),
            });

            if (res?.user?.accountId && track) {
              track<LoginEvent>('loginKeplr', {
                id: res.user.accountId,
                date: new Date().toUTCString(),
                account: wallet.address,
              });
            }
          }
        }
      } catch (e) {
        setError(e);
      }
    },
    [signArbitrary, token, retryCsrfRequest, reactQueryClient, setError, track],
  );

  return login;
};
