import { useEffect, useState } from 'react';
import { QueryProjectsByAdminResponse } from '@regen-network/api/lib/generated/regen/ecocredit/v1/query';

import { getMetadata } from '../lib/metadata-graph';
import useEcocreditQuery from './useEcocreditQuery';
import type { ProjectWithMetadataObj as Project } from '../types/ledger/ecocredit';

export default function useQueryProjectsByIssuer(issuer: string) {
  const { data: projectsResponse } =
    useEcocreditQuery<QueryProjectsByAdminResponse>({
      query: 'projectsByAdmin',
      params: { admin: issuer },
    });

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!projectsResponse?.projects) return;

    let ignore = false;

    const fetchData = async (): Promise<void> => {
      try {
        const _projects = await Promise.all(
          projectsResponse.projects.map(async project => {
            let metadata;
            if (project.metadata.length) {
              try {
                metadata = await getMetadata(project.metadata);
              } catch (error) {
                console.error(error);
              }
            }
            return {
              ...project,
              metadata,
            };
          }),
        );
        if (!ignore) {
          setProjects(_projects);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, [projectsResponse?.projects]);

  return projects;
}
