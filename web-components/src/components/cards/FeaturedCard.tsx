import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Card from './Card';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

export interface FeaturedCardProps {
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `solid 10px ${theme.palette.secondary.dark}`,
    backgroundColor: theme.palette.grey['200'],
  },
}));

export default function CreditCard({ children }: FeaturedCardProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Card className={classes.root} borderColor={theme.palette.grey[100]} borderRadius="10px" elevation={1}>
      {children}
    </Card>
  );
}
