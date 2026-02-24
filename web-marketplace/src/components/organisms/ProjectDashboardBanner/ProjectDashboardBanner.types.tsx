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
  migrateProject?: () => Promise<void>;
}
