<<<<<<< HEAD
import { useState, useEffect } from 'react';

import { QueryClassesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { getMetadata } from '../lib/metadata-graph';
=======
import { useEffect, useState } from 'react';
import { QueryClassesResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/query';
import { ClassInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1alpha1/types';

import { CreditClassMetadataLD } from 'generated/json-ld';
import { getMetadataFromUint8Array } from 'lib/metadata-graph';

>>>>>>> 92528156 (David/eslint simple import sort (#1075))
import useQueryListClasses from './useQueryListClasses';
import { CreditClassMetadataLD } from '../generated/json-ld';

interface ClassInfoWithMetadata extends ClassInfo {
  metadataJson?: Partial<CreditClassMetadataLD>;
}

export function useQueryListClassesWithMetadata(): ClassInfoWithMetadata[] {
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
