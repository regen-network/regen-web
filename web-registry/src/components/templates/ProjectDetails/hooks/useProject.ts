import { useEffect, useState } from 'react';

import { ProjectPageMetadataLD } from 'lib/db/types/json-ld';

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

const defaultValues = {
  projectPageMetadata: undefined,
  managementActions: undefined,
  projectEvents: undefined,
  projectDocs: undefined,
  creditClassVersion: undefined,
  creditClassName: undefined,
  coBenefitsIris: undefined,
  primaryImpactIRI: undefined,
};

export const useProject = (project?: any): UseProjectResponse => {
  const [values, setValues] = useState<UseProjectResponse>(defaultValues);

  useEffect(() => {
    /** Un-anchored metadata from the project.metadata jsonld column. */
    const projectPageMetadata: Partial<ProjectPageMetadataLD> =
      project?.metadata;

    const managementActions =
      projectPageMetadata?.['regen:landManagementActions']?.['@list'];

    const projectEvents = project?.eventsByProjectId?.nodes;
    const projectDocs = project?.documentsByProjectId?.nodes;

    const creditClassVersion =
      project?.creditClassByCreditClassId?.creditClassVersionsById?.nodes?.[0];

    const creditClassName = creditClassVersion?.name;
    const coBenefitsIris =
      creditClassVersion?.metadata?.['http://regen.network/coBenefits']?.[
        '@list'
      ]?.map((impact: { '@id': string }) => impact['@id']) || [];
    const primaryImpactIRI = [
      creditClassVersion?.metadata?.['http://regen.network/indicator']?.['@id'],
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
  }, [project]);

  return values;
};
