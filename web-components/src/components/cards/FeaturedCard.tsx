import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import Card from './Card';

export interface FeaturedCardProps {
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `solid 10px ${theme.palette.secondary.dark}`,
    backgroundColor: theme.palette.grey['200'],
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.75)} ${theme.spacing(10)} ${theme.spacing(16.25)}`,
    },
  },
}));

export default function CreditCard({ children }: FeaturedCardProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} borderColor={theme.palette.grey[100]} borderRadius="10px" elevation={1}>
      {children}
    </Card>
  );
}
