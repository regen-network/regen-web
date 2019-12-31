import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PlaceIcon from '@material-ui/icons/Place';

interface PlaceInfoProps {
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '1rem',
    color: theme.palette.info.main,
    marginRight: theme.spacing(0.75),
  },
  content: {
    fontSize: '0.875rem',
  },
}));


export default function PlaceInfo({ children }: PlaceInfoProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <PlaceIcon className={classes.icon} />
      <Typography className={classes.content}>{children}</Typography>
    </div>
  );
}
