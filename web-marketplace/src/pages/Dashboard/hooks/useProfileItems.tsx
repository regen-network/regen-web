import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIsClassAdmin } from 'hooks/useQueryIsClassAdmin';
import { useQueryIsIssuer } from 'hooks/useQueryIsIssuer';
import { useQueryIsProjectAdmin } from 'hooks/useQueryIsProjectAdmin';

export const useProfileItems = () => {
  const isIssuer = useQueryIsIssuer();
  const isCreditClassCreator = useQueryIfCreditClassCreator();
  const isProjectAdmin = useQueryIsProjectAdmin();
  const isCreditClassAdmin = useQueryIsClassAdmin();

  const showProjects = isIssuer || isProjectAdmin;
  const showCreditClasses = isCreditClassCreator || isCreditClassAdmin;

  return {
    showProjects,
    // Explicitly set to false until we enable the class creation flow
    showCreditClasses: false && showCreditClasses,
    isCreditClassCreator: false && isCreditClassCreator,
    isProjectAdmin,
    isIssuer,
  };
};
