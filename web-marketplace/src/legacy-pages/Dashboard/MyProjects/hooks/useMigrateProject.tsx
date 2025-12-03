import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export const useMigrateProject = (
  project: NormalizeProject,
  navigateToOrg: boolean = false,
) => {
  const navigate = useNavigate();

  const { migrateProjects } = useMigrateProjects({
    projects: [project],
    onSuccess: navigateToOrg
      ? () => navigate(`/dashboard/organization/projects/${project.id}/manage`)
      : undefined,
  });

  const migrateProject = useCallback(async () => {
    await migrateProjects({
      selectedProjectIds: [project.id],
    });
  }, [migrateProjects, project.id]);

  return { migrateProject };
};
