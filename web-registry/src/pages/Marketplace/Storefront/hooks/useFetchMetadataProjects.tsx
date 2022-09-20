import { useEffect, useState } from 'react';
import { ProjectInfo } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { getMetadata } from 'lib/metadata-graph';

type Props = {
  projects?: ProjectInfo[];
};

export type ProjectInfoWithMetadata = Omit<ProjectInfo, 'metadata'> & {
  metadata: any;
};

type ResponseType = {
  projectsWithMetadata?: ProjectInfoWithMetadata[];
};

export const useFetchMetadataProjects = ({ projects }: Props): ResponseType => {
  const [projectsWithMetadata, setProjectsWithMetadata] = useState<
    ProjectInfo[] | undefined
  >();

  useEffect(() => {
    const fetchProjectsMetadata = async (): Promise<void> => {
      if (projects) {
        const projectsUpdated = await Promise.all(
          projects?.map(async project => {
            let metadata;
            if (project.metadata.length) {
              try {
                metadata = await getMetadata(project.metadata);
              } catch (error) {
                // eslint-disable-next-line
                console.error(error);
              }
            }

            return { ...project, metadata };
          }),
        );

        setProjectsWithMetadata(projectsUpdated);
      }
    };

    fetchProjectsMetadata();
  }, [projects]);

  return { projectsWithMetadata };
};
