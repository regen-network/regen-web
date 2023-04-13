import ReactPlayerLazy from 'react-player/lazy';
import { Box, Grid } from '@mui/material';
import cx from 'clsx';

import ReadMore from 'web-components/lib/components/read-more';
import Section from 'web-components/lib/components/section';
import { Label, Title } from 'web-components/lib/components/typography';

import { useProjectStorySectionStyles } from './ProjectStorySection.styles';
import { ProjectStorySectionProps } from './ProjectStorySection.types';
import { parseProjectPageMetadata } from './ProjectStorySection.utils';

export function ProjectStorySection({
  projectPageMetadata,
}: ProjectStorySectionProps): JSX.Element | null {
  const { storyMedia, storyTitle, story } =
    parseProjectPageMetadata(projectPageMetadata);
  const { classes } = useProjectStorySectionStyles();

  return storyMedia || (storyTitle && story) ? (
    <Section
      sx={{
        root: {
          overflow: { md: 'visible' },
          pb: { xs: 19.75, sm: 25 },
          ...(storyTitle &&
            story &&
            storyMedia && { pr: { tablet: 2.5, lg: 0 } }),
        },
      }}
    >
      <Grid container>
        {storyTitle && story && (
          <Grid
            item
            xs={12}
            sm={storyMedia ? 5 : 12}
            // hack to avoid TS error using custom breakpoints on MUI Grid...
            {...{ tablet: storyMedia ? 6 : 12 }}
            sx={{
              ...(storyMedia && { pr: { sm: 10 } }),
              ...(!storyMedia && { maxWidth: { sm: 752 } }),
              margin: 'auto',
            }}
          >
            <Label size="sm" mobileSize="sm" color="info.main">
              story
            </Label>
            <Title variant="h3" mobileVariant="h5" sx={{ py: 2.5 }}>
              {storyTitle}
            </Title>
            <ReadMore
              maxLength={450}
              restMinLength={300}
              classes={storyMedia && { textContainer: classes.readMore }}
            >
              {story}
            </ReadMore>
          </Grid>
        )}
        {storyMedia && (
          <Grid
            item
            xs={12}
            sm={storyTitle && story ? 7 : 12}
            {...{ tablet: storyTitle && story ? 6 : 12 }}
          >
            {storyMedia['@type'] === 'schema:VideoObject' ? (
              <Box
                className={cx(classes.mediaContainer, classes.videoContainer)}
              >
                <ReactPlayerLazy
                  className={classes.video}
                  url={storyMedia['schema:url']}
                  width="100%"
                  height="100%"
                  controls
                />
              </Box>
            ) : (
              <Box className={classes.mediaContainer}>
                <Box
                  component="img"
                  src={storyMedia['schema:url']}
                  alt="project story"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                    objectFit: 'cover',
                    ...(storyTitle && story && { maxHeight: { sm: 380 } }),
                  }}
                />
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </Section>
  ) : null;
}
