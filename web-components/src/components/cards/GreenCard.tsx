import React from 'react';
import { useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import Card from './Card';

export interface GreenCardProps {
  children?: any;
  className?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
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
  const { classes, cx } = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={cx(classes.root, className)}
      borderColor={theme.palette.grey[100]}
      borderRadius="10px"
      elevation={1}
    >
      {children}
    </Card>
  );
}
