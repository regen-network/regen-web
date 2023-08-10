import { Grid } from '@mui/material';

import Section from 'web-components/lib/components/section';

import { StoryMedia } from './ProjectStorySection.StoryMedia';
import { StoryText } from './ProjectStorySection.StoryText';
import { ProjectStorySectionProps } from './ProjectStorySection.types';
import { parseProjectPageMetadata } from './ProjectStorySection.utils';

export function ProjectStorySection({
  projectPageMetadata,
}: ProjectStorySectionProps): JSX.Element | null {
  const { storyMedia, storyTitle, story } =
    parseProjectPageMetadata(projectPageMetadata);

  return storyMedia?.['schema:url'] || (storyTitle && story) ? (
    <Section
      sx={{
        root: {
          overflow: { md: 'visible' },
          pb: { xs: 19.75, sm: 25 },
          ...(storyTitle && story && storyMedia && { pr: { md: 2.5, lg: 0 } }),
        },
      }}
    >
      <Grid container>
        {storyTitle && story && (
          <StoryText
            storyTitle={storyTitle}
            story={story}
            hasMedia={!!storyMedia}
          />
        )}
        {storyMedia?.['schema:url'] && (
          <StoryMedia
            storyMedia={storyMedia}
            hasText={!!storyTitle && !!story}
          />
        )}
      </Grid>
    </Section>
  ) : null;
}
