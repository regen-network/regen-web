import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';

interface RegenCardProps {
  children?: any;
  width?: string;
}

interface StyleProps {
  width?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: '5px',
    maxWidth: props.width || '100%',
  }),
}));

export default function RegenCard({ children, width }: RegenCardProps): JSX.Element {
  const classes = useStyles({ width });
  return (
    <Card classes={{ root: classes.root }} elevation={0}>
      {children}
    </Card>
  );
}
