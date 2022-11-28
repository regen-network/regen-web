import { useEffect, useState } from 'react';
import {
  ClassInfo,
  QueryClassesResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { getMetadata } from 'lib/db/api/metadata-graph';
import { CreditClassMetadataLD } from 'lib/db/types/json-ld';

import useQueryListClasses from './useQueryListClasses';

interface ClassInfoWithMetadata extends ClassInfo {
  metadataJson?: Partial<CreditClassMetadataLD>;
}

export default function useQueryListClassesWithMetadata(): ClassInfoWithMetadata[] {
  const creditClasses = useQueryListClasses();
  const [classList, setClassList] = useState<ClassInfoWithMetadata[]>([]);

  useEffect(() => {
    async function fetchMetadata(
      creditClasses?: QueryClassesResponse,
    ): Promise<void> {
      if (!creditClasses || creditClasses?.classes?.length < 1)
        return Promise.reject();

      await Promise.all(
        creditClasses.classes.map(
          async (creditClass: ClassInfoWithMetadata) => {
            if (!creditClass?.metadata?.length) return creditClass;
            try {
              const metadataJson = await getMetadata(creditClass.metadata);
              return {
                ...creditClass,
                metadataJson,
              };
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(
                `Metadata not found for class ${creditClass.id}:\n`,
                e,
              );
              return creditClass;
            }
          },
        ),
      ).then(responses => {
        setClassList(responses as ClassInfoWithMetadata[]);
      });
    }

    fetchMetadata(creditClasses);
  }, [creditClasses]);

  return classList;
}
