import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../../../theme/muiTheme';

export const useFileDropStyles = makeStyles()((theme: Theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  preview: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  previewImage: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  previewVideo: {
    '& video': {
      borderRadius: 5,
    },
  },
  main: {
    height: '100%',
    width: '100%',
  },
  drop: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    background: theme.palette.grey[50],
    border: `2px dashed ${theme.palette.grey[100]}`,
  },
  or: {
    marginBottom: theme.spacing(4),
    fontSize: theme.typography.pxToRem(12),
  },
  buttons: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  button: {
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.grey[50],
    },
  },
}));
