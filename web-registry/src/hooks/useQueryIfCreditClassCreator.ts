import { useEffect, useState } from 'react';

import { queryParams } from 'lib/ecocredit/api';

import { useWallet } from '../lib/wallet';

export function useQueryIfCreditClassCreator(): boolean {
  const [isCreator, setCreator] = useState(false);
  const { wallet } = useWallet();
  useEffect(() => {
    const queryIfCreator = async (): Promise<void> => {
      if (!wallet?.address) {
        setCreator(false);
      } else {
        try {
          const result = await queryParams();
          const allowlistEnabled = result.params?.allowlistEnabled;
          if (allowlistEnabled) {
            const isCreator =
              result.params?.allowedClassCreators.includes(wallet.address) ===
              true;
            setCreator(isCreator);
          } else {
            // if the allowlist is not enabled, anyone can create a credit class
            setCreator(true);
          }
        } catch (err) {
          setCreator(false);
        }
      }
    };

    queryIfCreator();
  }, [wallet?.address]);
  return isCreator;
}
