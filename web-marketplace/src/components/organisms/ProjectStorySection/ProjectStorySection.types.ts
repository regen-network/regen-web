import { SxProps } from '@mui/material';

import { Theme } from 'web-components/src/theme/muiTheme';

import { ProjectPageMetadataLD, ProjectStoryMedia } from 'lib/db/types/json-ld';

export type ProjectStorySectionProps = {
  projectPageMetadata?: ProjectPageMetadataLD;
  sx?: SxProps<Theme>;
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
