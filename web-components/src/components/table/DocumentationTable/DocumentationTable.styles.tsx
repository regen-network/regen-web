import { makeStyles } from 'tss-react/mui';

export const useDocumentationTableStyles = makeStyles()(theme => ({
  rowClickable: {
    cursor: 'pointer',
  },
  nameCell: {
    fontWeight: 'bold',
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(8),
      paddingRight: theme.spacing(3.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      paddingRight: theme.spacing(3.75),
    },
  },
  documentCell: {
    minWidth: theme.spacing(60),
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      fontSize: 'inherit',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(2.75),
    },
  },
  ledgerBtn: {
    padding: theme.spacing(2, 4),
  },
}));
