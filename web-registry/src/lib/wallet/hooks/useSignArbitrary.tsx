import { useCallback } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { SignArbitraryParams } from '../wallet';
import { getArbitraryLoginData } from '../wallet.utils';

type Props = {
  setError: UseStateSetter<unknown>;
};

export const useSignArbitrary = ({ setError }: Props) => {
  const signArbitrary = useCallback(
    async ({
      walletConfig,
      walletConnect,
      wallet,
      nonce,
    }: SignArbitraryParams) => {
      try {
        if (wallet?.address) {
          const walletClient = await walletConfig?.getClient({
            chainInfo,
            walletConnect,
          });

          const signature = await walletClient?.signArbitrary(
            chainInfo.chainId,
            wallet.address,
            getArbitraryLoginData(nonce),
          );
          return signature;
        }
        return undefined;
      } catch (e) {
        setError(e);
        return undefined;
      }
    },
    [setError],
  );
  return signArbitrary;
};
