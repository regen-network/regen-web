import { useEffect, useState } from 'react';

import { CreditClass, CreditClassVersion, Maybe } from 'generated/graphql';

type UseProjectResponse = {
  creditClass?: Maybe<CreditClass>;
  creditClassVersion?: Maybe<CreditClassVersion>;
  sdgIris?: any[];
  offsetGenerationMethod?: string;
};

export const useProject = (project?: any): UseProjectResponse => {
  const [values, setValues] = useState<UseProjectResponse>({});

  useEffect(() => {
    const creditClass = project?.creditClassByCreditClassId;
    const creditClassVersion = creditClass?.creditClassVersionsById?.nodes?.[0];
    const sdgIris = creditClassVersion?.metadata?.[
      'http://regen.network/SDGs'
    ]?.['@list']?.map((sdg: { '@id': string }) => sdg['@id']);
    const offsetGenerationMethod =
      creditClassVersion?.metadata?.[
        'http://regen.network/offsetGenerationMethod'
      ];

    setValues({
      creditClass,
      creditClassVersion,
      sdgIris,
      offsetGenerationMethod,
    });
  }, [project]);

  return values;
};
