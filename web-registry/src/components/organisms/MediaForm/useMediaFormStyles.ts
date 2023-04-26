import { makeStyles } from 'tss-react/mui';

export const useMediaFormStyles = makeStyles()(theme => ({
  fullSizeMedia: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.typography.pxToRem(290),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.typography.pxToRem(210),
    },
  },
  smallButton: {
    fontSize: theme.typography.pxToRem(14),
    padding: theme.spacing(2, 3),
  },
  galleryItem: {
    marginTop: theme.typography.pxToRem(10),
  },
}));
