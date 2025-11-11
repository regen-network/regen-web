import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';
import { useQueryIsClassAdmin } from 'hooks/useQueryIsClassAdmin';

export const useShowCreditClasses = ({
  activeAddress,
  userAddress,
}: {
  activeAddress?: string;
  userAddress?: string;
}) => {
  const isCreditClassCreator = useQueryIfCreditClassCreator({
    address: activeAddress,
  });
  const isCreditClassAdmin = useQueryIsClassAdmin({ address: activeAddress });
  const { creditClasses } = useFetchCreditClassesWithOrder({
    admin: activeAddress,
    userAddress,
  });
  const showCreditClasses =
    (isCreditClassCreator || isCreditClassAdmin) && creditClasses.length > 0;

  return { isCreditClassCreator, showCreditClasses, creditClasses };
};
