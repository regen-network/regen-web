import {
  AnchoredProjectMetadataBaseLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';

import { ProjectWithOrderData } from 'pages/Projects/Projects.types';

import DefaultProject from 'assets/default-project.jpg';

interface NormalizeProjectsWithOrderDataParams {
  projectsWithOrderData?: ProjectWithOrderData[];
  metadatas?: (AnchoredProjectMetadataBaseLD | undefined)[];
  projectPageMetadatas?: ProjectPageMetadataLD[];
}

export const normalizeProjectsWithMetadata = ({
  projectsWithOrderData,
  metadatas,
  projectPageMetadatas,
}: NormalizeProjectsWithOrderDataParams): ProjectWithOrderData[] => {
  const projectsWithMetadata = projectsWithOrderData?.map(
    (project: ProjectWithOrderData, index) => {
      const metadata = metadatas?.[index];
      const projectPageMetadata = projectPageMetadatas?.[index];
      const creditClass = project.sanityCreditClassData;
      const creditClassImage =
        creditClass?.image?.image?.asset?.url ?? creditClass?.image?.imageHref;

      return {
        ...project,
        id: project.id,
        name: metadata?.['schema:name'] || project.name,
        imgSrc:
          projectPageMetadata?.['regen:previewPhoto']?.['schema:url'] ??
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
