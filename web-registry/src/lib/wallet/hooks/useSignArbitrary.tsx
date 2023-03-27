import { MutableRefObject, useCallback } from 'react';
import WalletConnect from '@walletconnect/client';

import { UseStateSetter } from 'types/react/use-state';

import { chainInfo } from '../chainInfo/chainInfo';
import { SignArbitraryParams } from '../wallet';
import { getArbitraryLoginData } from '../wallet.utils';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';

type Props = {
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  walletConnect?: WalletConnect;
  setError: UseStateSetter<unknown>;
};

export const useSignArbitrary = ({
  walletConfigRef,
  walletConnect,
  setError,
}: Props) => {
  const signArbitrary = useCallback(
    async ({ wallet, nonce }: SignArbitraryParams) => {
      try {
        if (wallet?.address) {
          const walletClient = await walletConfigRef.current?.getClient({
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
    [walletConfigRef, walletConnect, setError],
  );
  return signArbitrary;
};
