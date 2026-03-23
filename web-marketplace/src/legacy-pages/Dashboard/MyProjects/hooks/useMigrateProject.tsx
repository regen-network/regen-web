import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMigrateProjects } from 'legacy-pages/CreateOrganization/hooks/useMigrateProjects/useMigrateProjects';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export const useMigrateProject = ({
  project,
  navigateToOrg = false,
  feeGranter,
}: {
  project?: NormalizeProject;
  navigateToOrg?: boolean;
  feeGranter?: string;
}) => {
  const navigate = useNavigate();

  const { migrateProjects } = useMigrateProjects({
    projects: project ? [project] : [],
    onSuccess:
      navigateToOrg && project
        ? () =>
            navigate(`/dashboard/organization/projects/${project.id}/manage`)
        : undefined,
    feeGranter,
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
