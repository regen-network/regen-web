import { useAuth } from 'lib/auth/auth';

import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useQueryIsProjectAdmin } from 'hooks/useQueryIsProjectAdmin';
import { useShowCreditClasses } from 'hooks/useShowCreditClasses';

type Props = {
  address?: string | null;
  accountId?: string;
};

export const useProfileItems = ({ address, accountId }: Props) => {
  const { activeAccountId } = useAuth();
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;
  const { isIssuer, isLoadingIsIssuer } = useQueryIsIssuer({
    address,
  });
  const { isProjectAdmin } = useQueryIsProjectAdmin({
    address,
    accountId,
  });

  const activeAccountProfile = !!activeAccountId && !accountId && !address;
  const showProjects = isProjectAdmin || activeAccountProfile;

  const { isCreditClassCreator, showCreditClasses } = useShowCreditClasses({
    activeAddress: activeAddress,
  });

  return {
    showProjects,
    showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isProjectAdmin: isProjectAdmin,
    isIssuer: isIssuer,
    isLoadingIsIssuer,
  };
};
