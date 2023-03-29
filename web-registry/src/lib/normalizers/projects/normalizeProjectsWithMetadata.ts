import { AllCreditClassQuery } from 'generated/sanity-graphql';
import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';
import { findSanityCreditClass } from 'components/templates/ProjectDetails/ProjectDetails.utils';

import DefaultProject from 'assets/default-project.jpg';

interface NormalizeProjectsWithOrderDataParams {
  projectsWithOrderData?: ProjectWithOrderData[];
  metadatas?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPageMetadatas?: ProjectPageMetadataLD[];
  sanityCreditClassData?: AllCreditClassQuery;
}

export const normalizeProjectsWithMetadata = ({
  projectsWithOrderData,
  metadatas,
  projectPageMetadatas,
  sanityCreditClassData,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (project: ProjectWithOrderData, index) => {
      const metadata = metadatas?.[index];
      const projectPageMetadata = projectPageMetadatas?.[index];
      const creditClass = findSanityCreditClass({
        sanityCreditClassData,
        creditClassIdOrUrl: project.creditClassId ?? '',
      });
      const creditClassImage =
        creditClass?.image?.image?.asset?.url ?? creditClass?.image?.imageHref;

      return {
        ...project,
        id: project.id,
        name: metadata?.['schema:name'] || project.name,
        imgSrc:
          projectPageMetadata?.['regen:previewPhoto'] ??
          creditClassImage ??
          DefaultProject,
        place: metadata?.['schema:location']?.place_name || project.place,
        area: metadata?.['regen:projectSize']?.['qudt:numericValue'],
        areaUnit: metadata?.['regen:projectSize']?.['qudt:unit'] || '',
      } as ProjectWithOrderData;
    },
  );

  return projectsWithMetadata ?? [];
};
