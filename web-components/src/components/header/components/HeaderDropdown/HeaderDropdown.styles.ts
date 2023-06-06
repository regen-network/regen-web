import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => {
  const { pxToRem } = theme.typography;
  return {
    item: {
      padding: theme.spacing(1.5, 0),
      '&:first-of-type': {
        paddingTop: 0,
      },
      '&:last-of-type': {
        paddingBottom: 0,
      },
    },
    label: {
      fontSize: pxToRem(14),
      letterSpacing: '1px',
      lineHeight: pxToRem(17.57),
      fontWeight: 800,
      color: theme.palette.info.dark,
      textTransform: 'uppercase',
    },
  };
});
