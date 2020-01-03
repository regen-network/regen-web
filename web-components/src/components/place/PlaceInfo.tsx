import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PlaceIcon from '@material-ui/icons/Place';

interface PlaceInfoProps {
  children?: any;
  fontSize?: string;
  color?: string;
  className?: string;
}

interface StyleProps {
  fontSize?: string;
  color?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '1rem',
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(0.75),
  },
  content: props => ({
    fontSize: props.fontSize || '0.875rem',
    color: props.color || theme.palette.primary.contrastText,
  }),
}));

export default function PlaceInfo({ children, fontSize, color }: PlaceInfoProps): JSX.Element {
  const classes = useStyles({ fontSize, color });
  return (
    <div className={classes.root}>
      <PlaceIcon className={classes.icon} />
      <Typography className={classes.content}>{children}</Typography>
    </div>
  );
}
