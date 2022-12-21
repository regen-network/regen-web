import { useEffect, useState } from 'react';

import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';
import { jsonLdCompact } from 'lib/rdf';

type UseProjectResponse = {
  projectPageMetadata?: any;
  managementActions?: any;
  projectEvents?: any;
  projectDocs?: any;
  creditClassVersion?: any;
  creditClassName?: string;
  coBenefitsIris?: any;
  primaryImpactIRI?: any;
};

export const useProject = (project?: any): UseProjectResponse => {
  const [values, setValues] = useState<UseProjectResponse>({});

  useEffect(() => {
    const getValues = async (): Promise<void> => {
      /** Un-anchored metadata from the project.metadata jsonld column. */
      const projectPageMetadata = (await jsonLdCompact(
        project?.metadata,
      )) as Partial<ProjectPageMetadataLD>;

      const managementActions =
        projectPageMetadata?.['regen:landManagementActions']?.['@list'];

      const projectEvents = project?.eventsByProjectId?.nodes;
      const projectDocs = project?.documentsByProjectId?.nodes;

      const creditClassVersion =
        project?.creditClassByCreditClassId?.creditClassVersionsById
          ?.nodes?.[0];

      const creditClassName = creditClassVersion?.name;
      const coBenefitsIris =
        creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
          '@list'
        ]?.map((impact: { '@id': string }) => impact['@id']) || [];
      const primaryImpactIRI = [
        creditClassVersion?.metadata?.['http://regen.network/indicator']?.[
          '@id'
        ],
      ];

      setValues({
        projectPageMetadata,
        managementActions,
        projectEvents,
        projectDocs,
        creditClassVersion,
        creditClassName,
        coBenefitsIris,
        primaryImpactIRI,
      });
    };

    getValues();
  }, [project]);

  return values;
};
