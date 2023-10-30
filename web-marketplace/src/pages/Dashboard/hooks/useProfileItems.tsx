import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIsClassAdmin } from 'hooks/useQueryIsClassAdmin';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useQueryIsProjectAdmin } from 'hooks/useQueryIsProjectAdmin';

type Props = {
  address?: string | null;
};

export const useProfileItems = ({ address }: Props) => {
  const { isIssuer } = useQueryIsIssuer({ address });
  const isCreditClassCreator = useQueryIfCreditClassCreator({ address });
  const { isProjectAdmin } = useQueryIsProjectAdmin({ address });
  const isCreditClassAdmin = useQueryIsClassAdmin({ address });

  const showProjects = isIssuer || isProjectAdmin;
  const showCreditClasses = isCreditClassCreator || isCreditClassAdmin;

  return {
    showProjects,
    showCreditClasses: showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isProjectAdmin: isProjectAdmin,
    isIssuer: isIssuer,
  };
};
