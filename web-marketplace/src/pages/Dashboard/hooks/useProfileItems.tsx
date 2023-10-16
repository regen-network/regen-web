import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIsClassAdmin } from 'hooks/useQueryIsClassAdmin';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useQueryIsProjectAdmin } from 'hooks/useQueryIsProjectAdmin';

type Props = {
  address?: string;
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
    // Explicitly set to false until we enable the class creation flow
    showCreditClasses: showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isProjectAdmin: isProjectAdmin,
    isIssuer: isIssuer,
  };
};
