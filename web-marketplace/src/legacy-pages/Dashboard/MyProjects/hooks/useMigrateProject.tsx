import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export const useMigrateProject = (
  project?: NormalizeProject,
  navigateToOrg: boolean = false,
) => {
  const navigate = useNavigate();

  const { migrateProjects } = useMigrateProjects({
    projects: project ? [project] : [],
    onSuccess:
      navigateToOrg && project
        ? () => navigate(`/dashboard/organization/projects/${project.id}/manage`)
        : undefined,
  });

  const migrateProject = useCallback(
    async (projectId?: string, projectName?: string) => {
      const id = projectId || project?.id;
      if (!id) return;
      await migrateProjects({
        selectedProjectIds: [id],
        newProjectName: projectName,
      });
    },
    [migrateProjects, project?.id],
  );

  return { migrateProject };
};
