import { Maybe } from 'generated/graphql';

interface Project {
  id: string;
  name?: string;
  place?: string;
  area?: number;
  areaUnit?: string;
  imgSrc?: string;
  slug?: string;
  adminDaoAddress?: Maybe<string>;
}

export interface ProjectBannerProps {
  project: Project;
  canEdit?: boolean;
  canCreatePost?: boolean;
  createPostDisabled?: boolean;
  onCreatePost: () => void;
  migrateProject?: () => Promise<void>;
}
