import { useMemo } from 'react';

import { useCreditClasses } from 'pages/Home/hooks/useCreditClasses';
import { useClassesWithMetadata } from 'hooks/classes/useClassesWithMetadata';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

export const useMergedCreditClasses = (adminId?: string) => {
  const {
    creditClasses: adminClasses,
    isLoadingCreditClasses: adminClassesLoading,
  } = useFetchCreditClassesWithOrder({ admin: adminId });

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

  const { classesMetadata, isClassesMetadataLoading } = useClassesWithMetadata(
    classesMissingSanityData.map(c => c.id),
  );

  const metadataByClassId = useMemo(() => {
    const map = new Map();
    classesMissingSanityData.forEach((missingClass, index) => {
      if (classesMetadata?.[index]) {
        map.set(missingClass.id, classesMetadata[index]);
      }
    });
    return map;
  }, [classesMissingSanityData, classesMetadata]);

  const hasSanityContent = (sanityClass: any) =>
    sanityClass?.shortDescriptionRaw || sanityClass?.descriptionRaw;

  const mergedCreditClasses = useMemo(() => {
    if (!adminClasses?.length) return [];

    return adminClasses.map(adminClass => {
      const matchingSanityClass = sanityCreditClasses?.find(
        sc => sc.path === adminClass.id,
      );

      if (matchingSanityClass && hasSanityContent(matchingSanityClass)) {
        return matchingSanityClass;
      }
      const metadata = metadataByClassId.get(adminClass.id);

      return {
        path: adminClass.id,
        id: adminClass.id,
        name: adminClass.name,
        description: metadata?.['schema:description'],
        imageSrc: adminClass.imgSrc,
        isMetadataOnly: true,
      };
    });
  }, [adminClasses, sanityCreditClasses, metadataByClassId]);

  const alignedPrograms = useMemo(() => {
    if (!mergedCreditClasses?.length) return [];

    return mergedCreditClasses.map(creditClass => {
      const originalIndex = sanityCreditClasses?.findIndex(
        sc => sc.path === creditClass.path,
      );

      return originalIndex !== -1 && originalIndex !== undefined
        ? creditClassesPrograms?.[originalIndex]
        : undefined;
    });
  }, [mergedCreditClasses, sanityCreditClasses, creditClassesPrograms]);

  const loading =
    adminClassesLoading ||
    sanityCreditClassesLoading ||
    (classesMissingSanityData.length > 0 && isClassesMetadataLoading);

  return {
    creditClasses: mergedCreditClasses,
    programs: alignedPrograms,
    loading,
  };
};
