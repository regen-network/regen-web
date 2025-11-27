import { useCallback } from 'react';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export const useMigrateProject = (project?: NormalizeProject) => {
  const { migrateProjects } = useMigrateProjects(project ? [project] : []);

  const migrateProject = useCallback(
    async (projectId?: string) => {
      const id = projectId || project?.id;
      if (!id) return;
      await migrateProjects({
        selectedProjectIds: [id],
      });
    },
    [migrateProjects, project?.id],
  );

  return { migrateProject };
};
