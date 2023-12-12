import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

interface StyleProps {
  disabled?: boolean;
  description?: ReactNode;
  error: boolean;
}

export const useFieldFormControlStyles = makeStyles<StyleProps>()(
  (theme, { error }) => ({
    error: {
      marginLeft: 0,
      marginRigth: 0,
      color: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      marginTop: theme.spacing(1),
      marginBottom: 0,
      fontFamily: '"Lato",-apple-system,sans-serif',
      fontWeight: 'bold',
      visibility: error ? 'visible' : 'hidden',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(3.5),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(3),
      },
    },
    label: {
      marginBottom: theme.spacing(2.25),
    },
    firstOfType: {
      '&:first-of-type': {
        marginTop: 0,
      },
    },
    default: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.typography.pxToRem(40),
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.typography.pxToRem(33),
      },
    },
  }),
);
