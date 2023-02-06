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
      const metadata: any = metadatas?.[index];
      const unanchoredMetadata: any = projectPageMetadatas?.[index];

      return {
        ...project,
        id: project.id,
        name: metadata?.['schema:name'] || project.name,
        imgSrc:
          unanchoredMetadata?.['regen:previewPhoto']?.['@value'] ||
          DefaultProject,
        place: metadata?.['schema:location']?.place_name || project.place,
        area: metadata?.['regen:projectSize']?.['qudt:numericValue']?.[
          '@value'
        ],
        areaUnit:
          metadata?.['regen:projectSize']?.['qudt:unit']?.['@value'] || '',
      } as ProjectWithOrderData;
    },
  );

  return projectsWithMetadata ?? [];
};
