import ReactPlayer from 'react-player';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Grid } from '@mui/material';
import cx from 'clsx';

import { useProjectStorySectionStyles } from './ProjectStorySection.styles';
import { StoryMediaProps } from './ProjectStorySection.types';

export function StoryMedia({
  storyMedia,
  hasText,
}: StoryMediaProps): JSX.Element {
  const { _ } = useLingui();
  const { classes } = useProjectStorySectionStyles();

  return (
    <Grid item xs={12} md={hasText ? 6 : 12}>
      {storyMedia['@type'] === 'schema:VideoObject' ? (
        <Box className={cx(classes.mediaContainer, classes.videoContainer)}>
          <ReactPlayer
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
            alt={_(msg`project story`)}
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
