import { Box, styled } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/lib/theme/muiTheme';

export const useProjectStorySectionStyles = makeStyles()((theme: Theme) => ({
  mediaContainer: {
    zIndex: 1,
    borderRadius: '5px',
    position: 'relative',
    paddingTop: '66.77%',
    '&:before': {
      content: '""',
      zIndex: -1,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background:
        'linear-gradient(204.4deg, #EEF1F3 5.94%, #F1F9F6 51.92%, #F9FBF8 97.89%)',
      transform: 'translate3d(20px, 30px, 0)',
      borderRadius: '5px',
    },
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '5px',
    overflow: 'hidden',
  },
}));
