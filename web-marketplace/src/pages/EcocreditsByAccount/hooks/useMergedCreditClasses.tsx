import { useMemo } from 'react';

import { useCreditClasses } from 'pages/Home/hooks/useCreditClasses';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import { createCreditClassFromMetadata } from '../CreditClassTab/utilis/createCreditClassFromMetadata';

export const useMergedCreditClasses = (adminId?: string) => {
  const {
    creditClasses: adminClasses,
    isLoadingCreditClasses: adminClassesLoading,
  } = useFetchCreditClassesWithOrder({
    admin: adminId,
  });

  const {
    creditClasses: sanityCreditClasses,
    creditClassesPrograms,
    loading: sanityCreditClassesLoading,
  } = useCreditClasses({});
  const classesMissingSanityData = useMemo(() => {
    if (!adminClasses?.length) return [];
    return adminClasses.filter(
      adminClass => !sanityCreditClasses?.some(sc => sc.path === adminClass.id),
    );
  }, [adminClasses, sanityCreditClasses]);

  const metadataClassIds = useMemo(
    () => classesMissingSanityData.map(c => c.id),
    [classesMissingSanityData],
  );

  const { classesMetadata, isClassesMetadataLoading } =
    useClassesWithMetadata(metadataClassIds);

  const mergedCreditClasses = useMemo(() => {
    if (!adminClasses?.length) return [];

    return adminClasses.map(adminClass => {
      const matchingSanityClass = sanityCreditClasses?.find(
        sc => sc.path === adminClass.id,
      );

      if (
        matchingSanityClass &&
        (matchingSanityClass.shortDescriptionRaw ||
          matchingSanityClass.descriptionRaw)
      ) {
        return matchingSanityClass;
      } else {
        const metadataIndex = metadataClassIds.findIndex(
          id => id === adminClass.id,
        );
        const metadata =
          metadataIndex >= 0 ? classesMetadata?.[metadataIndex] : undefined;
        return createCreditClassFromMetadata(adminClass, metadata);
      }
    });
  }, [adminClasses, sanityCreditClasses, metadataClassIds, classesMetadata]);

  // Create programs array that's aligned with mergedCreditClasses
  const alignedPrograms = useMemo(() => {
    if (!mergedCreditClasses?.length) return [];

    return mergedCreditClasses.map(creditClass => {
      const originalIndex = sanityCreditClasses?.findIndex(
        sc => sc.path === creditClass.path,
      );

      if (originalIndex !== -1 && originalIndex !== undefined) {
        return creditClassesPrograms?.[originalIndex];
      }
      return undefined;
    });
  }, [mergedCreditClasses, sanityCreditClasses, creditClassesPrograms]);

  const loading =
    adminClassesLoading ||
    sanityCreditClassesLoading ||
    (metadataClassIds.length > 0 && isClassesMetadataLoading);

  return {
    creditClasses: mergedCreditClasses,
    programs: alignedPrograms,
    loading,
  };
};
