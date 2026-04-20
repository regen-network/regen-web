import { useMigrateProject } from 'legacy-pages/Dashboard/MyProjects/hooks/useMigrateProject';

import { NormalizeProject } from 'lib/normalizers/projects/normalizeProjectsWithMetadata';

export interface ProjectBannerProps {
  project: Pick<
    NormalizeProject,
    | 'id'
    | 'name'
    | 'place'
    | 'area'
    | 'areaUnit'
    | 'imgSrc'
    | 'slug'
    | 'adminDaoAddress'
    | 'draft'
    | 'offChain'
  >;
  canEdit?: boolean;
  migrateProject?: () => ReturnType<typeof useMigrateProject>['migrateProject'];
}
