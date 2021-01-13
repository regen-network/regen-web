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
  iconClassName?: string;
}

interface StyleProps {
  fontSize?: string;
  color?: string;
  smFontSize?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  content: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: props.smFontSize || props.fontSize || theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: props.fontSize || theme.spacing(3.5),
    },
    marginLeft: theme.spacing(1.6),
    color: props.color || theme.palette.primary.contrastText,
  }),
}));

export default function PlaceInfo({
  children,
  fontSize,
  color,
  smFontSize,
  iconClassName,
}: PlaceInfoProps): JSX.Element {
  const classes = useStyles({ smFontSize, fontSize, color });
  return (
    <div className={classes.root}>
      <span className={iconClassName}>
        <PinIcon />
      </span>
      <Typography className={classes.content}>{children}</Typography>
    </div>
  );
}
