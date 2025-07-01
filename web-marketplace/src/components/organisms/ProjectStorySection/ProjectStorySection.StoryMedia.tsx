import { useEffect, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Box, Grid } from '@mui/material';
import cx from 'clsx';
import dynamic from 'next/dynamic';

import { useProjectStorySectionStyles } from './ProjectStorySection.styles';
import { StoryMediaProps } from './ProjectStorySection.types';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export function StoryMedia({
  storyMedia,
  hasText,
}: StoryMediaProps): JSX.Element {
  const { _ } = useLingui();
  const { classes } = useProjectStorySectionStyles();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Grid item xs={12} md={hasText ? 6 : 12}>
      {storyMedia['@type'] === 'schema:VideoObject' ? (
        <Box className={cx(classes.mediaContainer, classes.videoContainer)}>
          {isClient ? (
            // Fixing some hydration error, should be fixed in react-player v3
            // https://github.com/cookpete/react-player/issues/1428#issuecomment-1976765204
            <ReactPlayer
              className={classes.video}
              url={storyMedia['schema:url']}
              width="100%"
              height="100%"
              controls
            />
          ) : null}
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
