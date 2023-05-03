import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../../theme/muiTheme';

export const useVideoInputStyles = makeStyles()((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  collapse: {
    marginBottom: theme.spacing(4),
  },
  collapseHidden: {
    marginBottom: 0,
  },
  preview: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  button: {
    width: theme.typography.pxToRem(124),
  },
  deleteButton: {
    background: theme.palette.primary.main,
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    '&:hover': {
      background: theme.palette.grey[50],
    },
  },
}));
