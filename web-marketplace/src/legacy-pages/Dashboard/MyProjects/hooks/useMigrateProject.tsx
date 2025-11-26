import { useCallback } from 'react';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export const useMigrateProject = (project: NormalizeProject) => {
  const { migrateProjects } = useMigrateProjects([project]);

  const migrateProject = useCallback(async () => {
    await migrateProjects({
      selectedProjectIds: [project.id],
    });
  }, [migrateProjects, project.id]);

  return { migrateProject };
};
