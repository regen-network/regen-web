import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../theme/muiTheme';

export const useStyles = makeStyles()((theme: Theme) => ({
  popup: {
    '& .mapboxgl-popup-content': {
      padding: 0,
      background: 'none',
      boxShadow: 'none',
    },
    '& .mapboxgl-popup-tip': {
      display: 'none',
    },
  },
}));
