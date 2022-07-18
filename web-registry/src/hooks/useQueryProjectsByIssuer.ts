import { useEffect, useState } from 'react';
import {
  ProjectInfo,
  QueryProjectsByAdminResponse,
} from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { getMetadata } from '../lib/metadata-graph';
import useEcocreditQuery from './useEcocreditQuery';

export default function useQueryProjectsByIssuer(issuer: string) {
  const { data: projectsResponse } =
    useEcocreditQuery<QueryProjectsByAdminResponse>({
      query: 'projectsByAdmin',
      params: { admin: issuer },
    });

  const [projects, setProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    if (!projectsResponse?.projects) return;

    const fetchData = async (): Promise<void> => {
      try {
        const _projects = await Promise.all(
          projectsResponse.projects.map(async project => {
            let metadata;
            if (project.metadata.length) {
              try {
                metadata = await getMetadata(project.metadata);
              } catch (err) {}
            }
            return {
              ...project,
              metadata,
            };
          }),
        );
        setProjects(_projects);
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    };
    fetchData();
  }, [projectsResponse?.projects]);

  return { data: projects };
}
