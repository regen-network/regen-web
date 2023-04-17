import { ProjectPageMetadataLD, ProjectStoryMedia } from 'lib/db/types/json-ld';

export type ProjectStorySectionProps = {
  projectPageMetadata?: ProjectPageMetadataLD;
};

export type StoryTextProps = {
  storyTitle: string;
  story: string;
  hasMedia: boolean;
};

export type StoryMediaProps = {
  storyMedia: ProjectStoryMedia;
  hasText: boolean;
};

export type ParseProjectPageMetadataReturn = {
  storyMedia?: ProjectStoryMedia;
  story?: string;
  storyTitle?: string;
};
