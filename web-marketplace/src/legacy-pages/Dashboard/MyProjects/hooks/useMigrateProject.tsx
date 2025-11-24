import { useCallback } from 'react';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

export const useMigrateProject = (project: NormalizeProject) => {
  const { migrateProjects } = useMigrateProjects([project]);

  const migrateProject = useCallback(async () => {
    await migrateProjects({
      selectedProjectIds: [project.id],
    });
  }, [migrateProjects, project.id]);

  return { migrateProject };
};
