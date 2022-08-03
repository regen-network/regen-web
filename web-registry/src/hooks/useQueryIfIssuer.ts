import { useEffect, useState } from 'react';

import { queryClassIssuers } from '../lib/ecocredit/api';
import { useWallet } from '../lib/wallet';
import useQueryListClasses from './useQueryListClasses';

/**
 * Simply returns if user's wallet address was found in an on-chain credit class issuer list
 *  */
export default function useQueryIfIssuer(): boolean {
  const [isIssuer, setIsIssuer] = useState(false);
  const { wallet } = useWallet();
  const onChainClasses = useQueryListClasses();

  useEffect(() => {
    const queryIfIssuer = async (): Promise<void> => {
      if (!wallet?.address || !onChainClasses?.classes?.length) {
        setIsIssuer(false);
        return;
      }
      const result = onChainClasses?.classes?.some(async creditClass => {
        const { issuers } = await queryClassIssuers(creditClass.id);
        return issuers?.includes(wallet.address);
      });
      setIsIssuer(result);
    };

    queryIfIssuer();
  }, [onChainClasses?.classes, wallet?.address]);

  return isIssuer;
}
