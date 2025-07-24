import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../theme/muiTheme';

export const useStyles = makeStyles()((theme: Theme) => ({
  map: {
    '& .mapboxgl-ctrl-bottom-left': {
      [theme.breakpoints.down('sm')]: {
        top: 0, // position the mapbox logo at the top on mobile so it doesn't overlap with the slider
      },
    },
  },
  popup: {
    '&.mapboxgl-popup': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '& .mapboxgl-popup-content': {
      padding: '0 !important',
      background: 'none !important',
      boxShadow: 'none !important',
    },
    '& .mapboxgl-popup-tip': {
      display: 'none',
    },
  },
  mobileSlider: {
    width: '90%',
    '& .slick-list': { overflow: 'visible' },
    '& .slick-slide': {
      paddingRight: theme.spacing(1.75),
    },
  },
}));
