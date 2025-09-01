interface Project {
  id: string;
  name?: string;
  place?: string;
  area?: number;
  areaUnit?: string;
  imgSrc?: string;
  slug?: string;
}

export interface ProjectBannerProps {
  project: Project;
  canEdit?: boolean;
}
