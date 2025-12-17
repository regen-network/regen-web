import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';
import { useDaoOrganization } from 'hooks/useDaoOrganization';

export const useMigrateProject = (
  project?: NormalizeProject,
  navigateToOrg: boolean = false,
) => {
  const navigate = useNavigate();
  const orgDao = useDaoOrganization();

  const { migrateProjects } = useMigrateProjects({
    projects: project ? [project] : [],
    onSuccess:
      navigateToOrg && project
        ? () =>
            navigate(`/dashboard/organization/projects/${project.id}/manage`)
        : undefined,
    feeGranter: orgDao?.address,
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
