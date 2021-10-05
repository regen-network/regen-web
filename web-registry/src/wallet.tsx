import React, { useState, useEffect, createContext } from 'react';
const chainId = 'regen-hambach-1';

export type ContextType = {
  wallet?: any;
};

const WalletContext = createContext<ContextType>({});

export const WalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<any>();

  window.onload = async () => {
    await getWallet();
  };

  const getWallet = async (): Promise<void> => {
    if (!wallet) {
      const shortAddress = await checkForWallet();
      setWallet({ shortAddress });
    }
  };

  return <WalletContext.Provider value={{ wallet }}>{children}</WalletContext.Provider>;
};

export const useWallet = (): ContextType => React.useContext(WalletContext);

export const checkForWallet = async (): Promise<string | undefined> => {
  if (window.keplr) {
    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether or not to allow access if they haven't visited this website.
    // Also, it will request user to unlock the wallet if the wallet is locked.
    const key = await window.keplr.getKey(chainId);
    if (key && key.bech32Address) {
      return `${key.bech32Address.substring(0, 10)}...`;
    }
  }
  return undefined;
};
