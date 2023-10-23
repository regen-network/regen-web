import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { postData } from 'utils/fetch/postData';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { LoginParams, SignArbitraryType } from 'lib/wallet/wallet';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useLogin = ({ signArbitrary, setError, setAccountId }: Params) => {
  const reactQueryClient = useQueryClient();

  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const login = useCallback(
    async ({ walletConfig, wallet }: LoginParams): Promise<void> => {
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

          // Step 3: Generate the signature for the login request
          const signature = await signArbitrary({
            walletConfig,
            wallet,
            nonce: nonce || '',
          });

          // Step 4: Submit the signature to the login endpoint
          const { user } = await postData({
            url: `${apiUri}/marketplace/v1/web3auth/login`,
            data: { signature },
            token,
          });
          const accountId = user?.id;
          if (accountId) {
            setAccountId(accountId);
            reactQueryClient.invalidateQueries({
              queryKey: getPartyByAddrQueryKey({
                addr: wallet.address,
              }),
            });
          }
        }
      } catch (e) {
        setError(e);
      }
    },
    [signArbitrary, token, setAccountId, reactQueryClient, setError],
  );

  return login;
};
