import { useCallback } from 'react';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { SignArbitraryParams } from '../wallet';
import { getArbitraryData } from '../wallet.utils';

type Props = {
  setError: UseStateSetter<unknown>;
};

export const useSignArbitrary = ({ setError }: Props) => {
  const signArbitrary = useCallback(
    async ({
      walletConfig,
      wallet,
      nonce,
      connectWallet = false,
    }: SignArbitraryParams) => {
      try {
        if (wallet?.address) {
          const walletClient = await walletConfig?.getClient({
            chainInfo,
          });

          const signature = await walletClient?.signArbitrary(
            chainInfo.chainId,
            wallet.address,
            getArbitraryData({ nonce, connectWallet }),
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
