import { makeStyles } from 'tss-react/mui';

export const useHeaderMenuHoverStyles = makeStyles()(theme => ({
  menuItem: {
    boxSizing: 'border-box',
    height: '100%',
    lineHeight: theme.spacing(6),
    backgroundColor: 'inherit',
    '& > a': {
      borderBottom: '2px solid transparent',
      '&:hover': {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      },
    },
    '& > div': {
      borderBottom: '2px solid transparent',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: theme.spacing(1.25),
      paddingLeft: theme.spacing(1.25),
    },
  },
  currentMenuItem: {
    '& > a': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
  title: {
    fontSize: theme.spacing(3.25),
    letterSpacing: '1px',
    fontFamily: 'Muli',
    textTransform: 'uppercase',
  },
}));
