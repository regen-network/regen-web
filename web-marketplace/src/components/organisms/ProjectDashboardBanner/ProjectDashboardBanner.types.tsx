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
  canCreatePost?: boolean;
  createPostDisabled?: boolean;
  onCreatePost: () => void;
  migrateProject?: () => Promise<void>;
  createPostTooltipText?: string;
}
