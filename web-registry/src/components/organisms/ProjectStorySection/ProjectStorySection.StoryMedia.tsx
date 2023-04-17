import ReactPlayerLazy from 'react-player/lazy';
import { Box, Grid } from '@mui/material';
import cx from 'clsx';

import { useProjectStorySectionStyles } from './ProjectStorySection.styles';
import { StoryMediaProps } from './ProjectStorySection.types';

export function StoryMedia({
  hasText,
  storyMedia,
}: StoryMediaProps): JSX.Element {
  const { classes } = useProjectStorySectionStyles();

  return (
    <Grid item xs={12} sm={hasText ? 7 : 12} {...{ tablet: hasText ? 6 : 12 }}>
      {storyMedia['@type'] === 'schema:VideoObject' ? (
        <Box className={cx(classes.mediaContainer, classes.videoContainer)}>
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
              ...(hasText && { maxHeight: { sm: 380 } }),
            }}
          />
        </Box>
      )}
    </Grid>
  );
}
