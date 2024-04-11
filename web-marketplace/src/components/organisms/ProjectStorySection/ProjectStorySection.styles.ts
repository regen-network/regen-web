import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

export const useProjectStorySectionStyles = makeStyles()((theme: Theme) => ({
  mediaContainer: {
    zIndex: 1,
    borderRadius: '5px',
    position: 'relative',
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
      borderRadius: '5px',
      [theme.breakpoints.up('sm')]: {
        transform: 'translate3d(20px, 30px, 0)',
      },
      [theme.breakpoints.down('sm')]: {
        transform: 'translate3d(10px, 10px, 0)',
      },
    },
  },
  videoContainer: {
    paddingTop: '56.25%',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '5px',
    overflow: 'hidden',
  },
  readMore: {
    [theme.breakpoints.up('md')]: {
      width: '150%',
      '& > p:first-child': {
        width: '67%',
      },
    },
  },
  expanded: {
    [theme.breakpoints.up('md')]: {
      '& > p:first-child': {
        width: '67%',
      },
    },
  },
}));
