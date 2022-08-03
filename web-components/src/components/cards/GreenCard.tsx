import React from 'react';
import { DefaultTheme as Theme, makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';

import Card from './Card';

export interface GreenCardProps {
  children?: any;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderTop: `solid 10px ${theme.palette.secondary.dark}`,
    backgroundColor: theme.palette.grey['200'],
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(6)} ${theme.spacing(5)} ${theme.spacing(10)}`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(10.75)} ${theme.spacing(10)} ${theme.spacing(
        16.25,
      )}`,
    },
  },
}));

export default function GreenCard({
  children,
  className,
}: GreenCardProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={clsx(className, classes.root)}
      borderColor={theme.palette.grey[100]}
      borderRadius="10px"
      elevation={1}
    >
      {children}
    </Card>
  );
}
