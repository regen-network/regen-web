import { SxProps } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

export const useBottomCreditRetireFieldsStyles = makeStyles()(
  (theme: Theme) => ({
    noteTextField: {
      '& label': {
        whiteSpace: 'unset',
      },
    },
    stateCountryGrid: {
      [theme.breakpoints.up('sm')]: {
        flexWrap: 'nowrap',
      },
    },
    stateCountryTextField: {
      marginTop: theme.spacing(8),
      [theme.breakpoints.up('sm')]: {
        '&:first-of-type': {
          marginRight: theme.spacing(2.375),
        },
        '&:last-of-type': {
          marginLeft: theme.spacing(2.375),
        },
      },
    },
  }),
);

export const bottomCreditRetireFieldsSxs = {
  title: {
    mt: 10.75,
    mb: 3,
  } as SxProps,
};
