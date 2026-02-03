import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';
import { useQueryIfCreditClassCreator } from 'hooks/useQueryIfCreditClassCreator';

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
  const { creditClasses, isLoadingCreditClasses } =
    useFetchCreditClassesWithOrder({
      admin: activeAddress,
      userAddress,
    });
  const isCreditClassAdmin = (creditClasses?.length ?? 0) > 0;
  const showCreditClasses =
    (isCreditClassCreator || isCreditClassAdmin) && creditClasses.length > 0;

  return {
    isCreditClassCreator,
    showCreditClasses,
    creditClasses,
    isLoadingCreditClasses,
  };
};
