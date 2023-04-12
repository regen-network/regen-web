import LazyLoad from 'react-lazyload';
import ReactPlayerLazy from 'react-player/lazy';
import { Box, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';

import ReadMore from 'web-components/lib/components/read-more';
import Section from 'web-components/lib/components/section';
import { Label, Title } from 'web-components/lib/components/typography';

import { useProjectStorySectionStyles } from './ProjectStorySection.styles';
import { ProjectStorySectionProps } from './ProjectStorySection.types';
import { parseProjectPageMetadata } from './ProjectStorySection.utils';

export function ProjectStorySection({
  projectPageMetadata,
}: ProjectStorySectionProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { storyMedia, storyTitle, story } =
    parseProjectPageMetadata(projectPageMetadata);
  const mediaHeight = isMobile ? 221 : 438;
  const { classes } = useProjectStorySectionStyles();

  return (
    <Section>
      <Grid container>
        {storyTitle && story && (
          <Grid item xs={12} sm={storyMedia ? 6 : 12}>
            <Label size="sm" mobileSize="sm" color="info.main">
              story
            </Label>
            <Title variant="h3" mobileVariant="h5" sx={{ py: 2.5 }}>
              {storyTitle}
            </Title>
            <ReadMore maxLength={450} restMinLength={300}>
              {story}
            </ReadMore>
          </Grid>
        )}
        {storyMedia && (
          <Grid item xs={12} sm={storyTitle && story ? 6 : 12}>
            <LazyLoad offset={50}>
              {storyMedia['@type'] === 'schema:VideoObject' && (
                <Box className={classes.mediaContainer}>
                  <ReactPlayerLazy
                    className={classes.media}
                    url={storyMedia['schema:url']}
                    // fallback={<Skeleton height={mediaHeight} />}
                    width="100%"
                    height="100%"
                    controls
                  />
                </Box>
              )}
            </LazyLoad>
          </Grid>
        )}
      </Grid>
      {/* <LazyLoad offset={50}>
        {videoURL && (
          <Card className={classes.media}>
            <CardMedia
              component={ReactPlayerLazy}
              url={videoURL}
              height={isMobile ? 221 : 438}
              fallback={<Skeleton height={isMobile ? 221 : 438} />}
              width="100%"
            />
          </Card>
        )}
        {landStewardPhoto && (
          <img
            className={classes.media}
            alt="land steward"
            src={landStewardPhoto}
          />
        )}
      </LazyLoad> */}
    </Section>
  );
}
