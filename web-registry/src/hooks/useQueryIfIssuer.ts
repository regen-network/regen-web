import { useEffect, useState } from 'react';

import { asyncSome } from 'lib/asyncSome';

import { queryClassIssuers } from '../lib/ecocredit/api';
import { useWallet } from '../lib/wallet';
import useQueryListClasses from './useQueryListClasses';

/**
 * Simply returns if user's wallet address was found in an on-chain credit class issuer list
 *  */
function useQueryIfIssuer(): boolean {
  const [isIssuer, setIsIssuer] = useState(false);
  const { wallet } = useWallet();
  const onChainClasses = useQueryListClasses();

  useEffect(() => {
    const queryIfIssuer = async (): Promise<void> => {
      if (!wallet?.address || !onChainClasses?.classes?.length) {
        setIsIssuer(false);
        return;
      }
      const foundOne = await asyncSome(
        onChainClasses?.classes,
        async creditClass => {
          const { issuers } = await queryClassIssuers(creditClass.id);
          return issuers?.includes(wallet.address);
        },
      );

      setIsIssuer(foundOne);
    };

    queryIfIssuer();
  }, [onChainClasses?.classes, wallet?.address]);
  return isIssuer;
}

export { useQueryIfIssuer };
