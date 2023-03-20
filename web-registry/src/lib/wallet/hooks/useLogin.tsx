import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { SignArbitraryType, Wallet } from 'lib/wallet/wallet';

import { getAxiosInstance } from '../wallet.utils';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  setAccountId: UseStateSetter<string | undefined>;
};

export const useLogin = ({ signArbitrary, setError, setAccountId }: Params) => {
  // Step 1: Retrieve and save the CSRF tokens
  const { data: token } = useQuery(getCsrfTokenQuery({}));
  const login = useCallback(
    async (wallet?: Wallet): Promise<void> => {
      try {
        if (wallet?.address && signArbitrary && token) {
          const instance = getAxiosInstance(token);

          // Step 2: Retrieve a nonce for the user
          const nonceRes = await instance.get('web3auth/nonce', {
            params: { userAddress: wallet.address },
            validateStatus: (status: number) => {
              // 404 error might be returned in case of new user,
              // in which case we shouldn't consider this as an error and
              // should just continue the process using an empty string as nonce
              return (status >= 200 && status < 300) || status === 404;
            },
          });
          const nonce = nonceRes.data.nonce ?? '';

          // Step 3: Generate the signature for the login request
          const signature = await signArbitrary({ wallet, nonce });

          // Step 4: Submit the signature to the login endpoint
          const loginRes = await instance.post(`/web3auth/login`, {
            signature,
          });
          const accountId = loginRes?.data?.user?.id;
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
