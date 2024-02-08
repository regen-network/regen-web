import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../theme/muiTheme';

export const useStyles = makeStyles()((theme: Theme) => ({
  popup: {
    '&.mapboxgl-popup': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '& .mapboxgl-popup-content': {
      padding: 0,
      background: 'none',
      boxShadow: 'none',
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
