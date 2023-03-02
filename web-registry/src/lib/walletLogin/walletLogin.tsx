import React, { createContext, useRef, useState } from 'react';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Window as KeplrWindow } from '@keplr-wallet/types';
import LoginConnect from '@walletconnect/client';

import { useWallet } from 'lib/wallet/wallet';

import { useLogin } from './hooks/useLogin';

export type WalletLoginContextType = {
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
  account?: string;
  error?: unknown;
};

const WalletLoginContext = createContext<WalletLoginContextType>({
  // loaded: false,
});

export const WalletLoginProvider: React.FC<React.PropsWithChildren<unknown>> =
  ({ children }) => {
    const [error, setError] = useState<unknown>(undefined);

    const { signArbitrary, wallet } = useWallet();
    const login = useLogin({ signArbitrary, wallet, setError });
    return (
      <WalletLoginContext.Provider
        value={{
          login,
          error,
          // logout,
          // account,
        }}
      >
        {children}
      </WalletLoginContext.Provider>
    );
  };

export const useWalletLogin = (): WalletLoginContextType =>
  React.useContext(WalletLoginContext);
