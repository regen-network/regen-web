import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIsClassAdmin } from 'hooks/useQueryIsClassAdmin';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useQueryIsProjectAdmin } from 'hooks/useQueryIsProjectAdmin';

type Props = {
  address?: string | null;
  accountId?: string;
};

export const useProfileItems = ({ address, accountId }: Props) => {
  const { isIssuer } = useQueryIsIssuer({ address });
  const isCreditClassCreator = useQueryIfCreditClassCreator({ address });
  const { isProjectAdmin } = useQueryIsProjectAdmin({ address, accountId });
  const isCreditClassAdmin = useQueryIsClassAdmin({ address });

  const showProjects = isProjectAdmin || !!accountId;
  const showCreditClasses = isCreditClassCreator || isCreditClassAdmin;

  return {
    showProjects,
    showCreditClasses: showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isProjectAdmin: isProjectAdmin,
    isIssuer: isIssuer,
  };
};
