import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';

interface TitleProps {
  size: ThemeStyle;
  children?: any;
  color?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: theme.typography.body2.fontFamily,
    fontWeight: 900,
    // marginTop: theme.spacing(3),
  },
}));

export default function Title({ size, children, color }: TitleProps): JSX.Element {
  const classes = useStyles({});
  return (
    <Typography
      className={classes.root}
      color={color || 'textPrimary'}
      align="left"
      variant={size}>
      {children}
    </Typography>
  );
}
