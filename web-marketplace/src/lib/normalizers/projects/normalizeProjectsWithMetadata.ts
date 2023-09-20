import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import { Maybe, PartyFieldsFragment, Project } from 'generated/graphql';
import { AllCreditClassQuery, CreditClass } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { getDisplayParty } from 'components/templates/ProjectDetails/ProjectDetails.utils';

interface NormalizeProjectsWithOrderDataParams {
  projectsWithOrderData?: ProjectWithOrderData[];
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  programParties?: Maybe<PartyFieldsFragment | undefined>[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
}

export const normalizeProjectsWithMetadata = ({
  projectsWithOrderData,
  projectsMetadata,
  projectPagesMetadata,
  programParties,
  classesMetadata,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (projectWithOrderData: ProjectWithOrderData, index) => {
      const projectMetadata = projectsMetadata?.[index];
      const classMetadata = classesMetadata?.[index];
      const projectPageMetadata = projectPagesMetadata?.[index];
      const programParty = programParties?.[index];
      const sanityClass = projectWithOrderData.sanityCreditClassData;

      return normalizeProjectWithMetadata({
        projectWithOrderData,
        projectMetadata,
        projectPageMetadata,
        programParty,
        classMetadata,
        sanityClass,
      });
    },
  );

  return projectsWithMetadata ?? [];
};

interface NormalizeProjectWithMetadataParams {
  offChainProject?: Maybe<Pick<Project, 'id' | 'slug'>>;
  projectWithOrderData?: ProjectWithOrderData;
  projectMetadata?: AnchoredProjectMetadataBaseLD | undefined;
  projectPageMetadata?: ProjectPageMetadataLD;
  programParty?: Maybe<PartyFieldsFragment | undefined>;
  classMetadata?: CreditClassMetadataLD | undefined;
  sanityClass?: CreditClass;
}

export const normalizeProjectWithMetadata = ({
  offChainProject,
  projectWithOrderData,
  projectMetadata,
  projectPageMetadata,
  programParty,
  classMetadata,
  sanityClass,
}: NormalizeProjectWithMetadataParams) => {
  const creditClassImage = getClassImageWithProjectDefault({
    metadata: classMetadata,
    sanityClass,
  });
  const program = getDisplayParty(
    classMetadata?.['regen:sourceRegistry'],
    programParty,
  );

  const projectId = projectWithOrderData?.id || offChainProject?.id;

  return {
    ...projectWithOrderData,
    id: projectId,
    name:
      projectMetadata?.['schema:name'] ||
      projectWithOrderData?.name ||
      offChainProject?.slug ||
      offChainProject?.id ||
      projectWithOrderData?.id,
    href: projectId ? `/project/${projectId}` : undefined,
    imgSrc:
      projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ??
      creditClassImage,
    place:
      projectMetadata?.['schema:location']?.place_name ||
      projectWithOrderData?.place,
    program,
    area: projectMetadata?.['regen:projectSize']?.['qudt:numericValue'],
    areaUnit: projectMetadata?.['regen:projectSize']?.['qudt:unit'] || '',
  } as ProjectWithOrderData;
};
