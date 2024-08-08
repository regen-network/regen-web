import { makeStyles } from 'tss-react/mui';

type UseStylesParams = {
  optional: boolean;
};

export const useInputLabelStyles = makeStyles<UseStylesParams>()(
  (theme, { optional }) => ({
    root: {
      whiteSpace: 'normal',
      lineHeight: '140%',
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4.5),
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(4),
      },
      '&.Mui-error': {
        color: theme.palette.primary.contrastText,
      },
      '& > :first-child::after': {
        content: !!optional ? '" (optional)"' : '""',
        fontWeight: 'normal',
        color: theme.palette.info.main,
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: theme.spacing(3.5),
        },
      },
    },
  }),
);
