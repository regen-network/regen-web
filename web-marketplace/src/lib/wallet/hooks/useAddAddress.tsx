import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { UseStateSetter } from 'types/react/use-state';
import { apiUri } from 'lib/apiUri';
import { getPartiesByAccountIdQueryKey } from 'lib/queries/react-query/registry-server/getAccounts/getAccountsQuery.utils';
import { getCsrfTokenQuery } from 'lib/queries/react-query/registry-server/getCsrfTokenQuery/getCsrfTokenQuery';
import { getPartyByAddrQueryKey } from 'lib/queries/react-query/registry-server/graphql/getAccountByAddrQuery/getAccountByAddrQuery.utils';
import { LoginParams, SignArbitraryType, Wallet } from 'lib/wallet/wallet';

import { chainInfo } from '../chainInfo/chainInfo';
import { getNonce, getWallet } from '../wallet.utils';

type Params = {
  signArbitrary?: SignArbitraryType;
  setError: UseStateSetter<unknown>;
  setWallet: UseStateSetter<Wallet>;
};

export interface AddAddressParams extends LoginParams {
  accountId?: string;
  onSuccess?: () => void;
}

export const useAddAddress = ({
  signArbitrary,
  setError,
  setWallet,
}: Params) => {
  const reactQueryClient = useQueryClient();
  const { data: token } = useQuery(getCsrfTokenQuery({}));

  const addAddress = useCallback(
    async ({
      walletConfig,
      wallet,
      accountId,
      onSuccess,
    }: AddAddressParams): Promise<void> => {
      try {
        if (wallet?.address && signArbitrary && token) {
          // Get nonce for the current authenticated user
          const nonce = await getNonce({ userAddress: wallet.address, token });

          // Get new user wallet
          const walletClient = await walletConfig?.getClient({
            chainInfo,
          });
          const newWallet = await getWallet({ walletClient, walletConfig });

          if (newWallet) {
            // Generate the signature for the addresses request
            const signature = await signArbitrary({
              walletConfig,
              wallet: newWallet,
              nonce,
              addAddr: true,
            });

            // Submit the signature to the addresses endpoint
            await fetch(`${apiUri}/marketplace/v1/web3auth/addresses`, {
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

            await reactQueryClient.invalidateQueries({
              queryKey: getPartyByAddrQueryKey({
                addr: newWallet.address,
              }),
            });
            await reactQueryClient.invalidateQueries({
              queryKey: getPartiesByAccountIdQueryKey({ id: accountId }),
            });

            if (onSuccess) onSuccess();
          }
        }
      } catch (e) {
        setError(e);
      }
    },
    [signArbitrary, token, setWallet, reactQueryClient, setError],
  );

  return addAddress;
};
