import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PinIcon from '../icons/PinIcon';

interface PlaceInfoProps {
  children?: any;
  fontSize?: string;
  smFontSize?: string;
  color?: string;
  className?: string;
}

interface StyleProps {
  fontSize?: string;
  color?: string;
  smFontSize?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'baseline',
    },
  },
  content: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: props.smFontSize || props.fontSize || '1rem',
    },
    marginLeft: theme.spacing(1.6),
    fontSize: props.fontSize || '0.875rem',
    color: props.color || theme.palette.primary.contrastText,
  }),
}));

export default function PlaceInfo({ children, fontSize, color, smFontSize }: PlaceInfoProps): JSX.Element {
  const classes = useStyles({ smFontSize, fontSize, color });
  return (
    <div className={classes.root}>
      <PinIcon />
      <Typography className={classes.content}>{children}</Typography>
    </div>
  );
}
