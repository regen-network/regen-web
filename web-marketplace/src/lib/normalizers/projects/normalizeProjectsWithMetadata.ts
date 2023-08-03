import { getClassImageWithProjectDefault } from 'utils/image/classImage';

import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  CreditClassMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

interface NormalizeProjectsWithOrderDataParams {
  projectsWithOrderData?: ProjectWithOrderData[];
  projectsMetadata?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPagesMetadata?: ProjectPageMetadataLD[];
  sanityCreditClassData?: AllCreditClassQuery;
  classesMetadata?: (CreditClassMetadataLD | undefined)[];
}

export const normalizeProjectsWithMetadata = ({
  projectsWithOrderData,
  projectsMetadata,
  projectPagesMetadata,
  classesMetadata,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (project: ProjectWithOrderData, index) => {
      const projectMetadata = projectsMetadata?.[index];
      const classMetadata = classesMetadata?.[index];
      const projectPageMetadata = projectPagesMetadata?.[index];
      const sanityClass = project.sanityCreditClassData;

      const creditClassImage = getClassImageWithProjectDefault({
        metadata: classMetadata,
        sanityClass,
      });

      return {
        ...project,
        id: project.id,
        name: projectMetadata?.['schema:name'] || project.name,
        imgSrc:
          projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ??
          creditClassImage,
        place:
          projectMetadata?.['schema:location']?.place_name || project.place,
        area: projectMetadata?.['regen:projectSize']?.['qudt:numericValue'],
        areaUnit: projectMetadata?.['regen:projectSize']?.['qudt:unit'] || '',
      } as ProjectWithOrderData;
    },
  );

  return projectsWithMetadata ?? [];
};
