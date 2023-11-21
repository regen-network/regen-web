import { useAuth } from 'lib/auth/auth';
import { useWallet } from 'lib/wallet/wallet';

import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIsClassAdmin } from 'hooks/useQueryIsClassAdmin';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useQueryIsProjectAdmin } from 'hooks/useQueryIsProjectAdmin';

type Props = {
  address?: string | null;
  accountId?: string;
};

export const useProfileItems = ({ address, accountId }: Props) => {
  const { activeAccountId } = useAuth();
  const { wallet } = useWallet();
  const walletAddress = wallet?.address;
  const activeAddress = address ?? walletAddress;
  const { isIssuer } = useQueryIsIssuer({ address });
  const isCreditClassCreator = useQueryIfCreditClassCreator({ address });
  const { isProjectAdmin } = useQueryIsProjectAdmin({ address, accountId });
  const isCreditClassAdmin = useQueryIsClassAdmin({ address });
  const { creditClasses } = useFetchCreditClassesWithOrder({
    admin: activeAddress,
  });

  const activeAccountProfile = !!activeAccountId && !accountId && !address;
  const showProjects = isProjectAdmin || activeAccountProfile;

  const showCreditClasses =
    (isCreditClassCreator || isCreditClassAdmin) && creditClasses.length > 0;

  return {
    showProjects,
    showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isProjectAdmin: isProjectAdmin,
    isIssuer: isIssuer,
  };
};
