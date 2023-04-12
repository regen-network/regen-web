import { ProjectPageMetadataLD, ProjectStoryMedia } from 'lib/db/types/json-ld';

export type ProjectStorySectionProps = {
  projectPageMetadata?: ProjectPageMetadataLD;
};

export type ParseProjectPageMetadataReturn = {
  storyMedia?: ProjectStoryMedia;
  story?: string;
  storyTitle?: string;
};
