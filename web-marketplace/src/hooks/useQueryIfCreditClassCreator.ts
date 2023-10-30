import { useEffect, useState } from 'react';

import { queryParams } from 'lib/ecocredit/api';

import { useWallet } from '../lib/wallet/wallet';

type Props = {
  address?: string | null;
};

export function useQueryIfCreditClassCreator({ address }: Props): boolean {
  const [isCreator, setIsCreator] = useState(false);
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;

  useEffect(() => {
    const queryIfCreator = async (): Promise<void> => {
      if (!activeAddress) {
        setIsCreator(false);
      } else {
        try {
          const result = await queryParams({});
          const allowlistEnabled = result.params?.allowlistEnabled;
          if (allowlistEnabled) {
            const _isCreator =
              result.params?.allowedClassCreators.includes(activeAddress) ===
              true;
            setIsCreator(_isCreator);
          } else {
            // if the allowlist is not enabled, anyone can create a credit class
            setIsCreator(true);
          }
        } catch (err) {
          setIsCreator(false);
        }
      }
    };

    queryIfCreator();
  }, [activeAddress]);
  return isCreator;
}
