import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useShowCreditClasses } from 'hooks/useShowCreditClasses';

type Props = {
  address?: string | null;
};

export const useProfileItems = ({ address }: Props) => {
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;
  const { isIssuer, isLoadingIsIssuer } = useQueryIsIssuer({
    address,
  });

  const { isCreditClassCreator, showCreditClasses } = useShowCreditClasses({
    activeAddress: activeAddress,
  });

  return {
    showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isIssuer: isIssuer,
    isLoadingIsIssuer,
  };
};
