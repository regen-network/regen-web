import { MutableRefObject, useCallback } from 'react';
import WalletConnect from '@walletconnect/client';

import { chainInfo } from '../chainInfo/chainInfo';
import { Wallet } from '../wallet';
import { WalletConfig } from '../walletsConfig/walletsConfig.types';

type Props = {
  walletConfigRef: MutableRefObject<WalletConfig | undefined>;
  walletConnect?: WalletConnect;
  wallet?: Wallet;
};

export const useSignArbitrary = ({
  walletConfigRef,
  walletConnect,
  wallet,
}: Props) => {
  const signArbitrary = useCallback(
    async (nonce: string) => {
      if (wallet) {
        const walletClient = await walletConfigRef.current?.getClient({
          chainInfo,
          walletConnect,
        });

        const signature = await walletClient?.signArbitrary(
          chainInfo.chainId,
          wallet?.address,
          JSON.stringify({
            title: 'Regen Network Login',
            description:
              'This is a transaction that allows Regen Network to authenticate you with our application.',
            nonce,
          }),
        );
        return signature;
      }
      return undefined;
    },
    [wallet, walletConfigRef, walletConnect],
  );
  return signArbitrary;
};
