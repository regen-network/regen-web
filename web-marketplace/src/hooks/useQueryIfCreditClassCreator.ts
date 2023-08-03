import { useEffect, useState } from 'react';

import { queryParams } from 'lib/ecocredit/api';

import { useWallet } from '../lib/wallet/wallet';

export function useQueryIfCreditClassCreator(): boolean {
  const [isCreator, setIsCreator] = useState(false);
  const { wallet } = useWallet();
  useEffect(() => {
    const queryIfCreator = async (): Promise<void> => {
      if (!wallet?.address) {
        setIsCreator(false);
      } else {
        try {
          const result = await queryParams({});
          const allowlistEnabled = result.params?.allowlistEnabled;
          if (allowlistEnabled) {
            const _isCreator =
              result.params?.allowedClassCreators.includes(wallet.address) ===
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
  }, [wallet?.address]);
  return isCreator;
}
