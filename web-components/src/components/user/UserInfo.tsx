import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid, { GridDirection } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserAvatar from './UserAvatar';
import { getFontSize } from './sizing';

interface UserInfoProps {
  name: string;
  title?: string;
  place?: string;
  imgSrc: string;
  size?: string;
  direction?: GridDirection;
}

interface StyleProps {
  fontSize: string;
  title?: string;
  direction?: GridDirection;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  text: props => ({
    marginLeft: theme.spacing(2.4),
    textAlign: props.direction === 'column' ? 'center' : 'left',
  }),
  name: props => ({
    fontSize: props.fontSize,
    fontWeight: 'bold',
  }),
  title: {
    fontSize: '0.875rem',
  },
  place: props => ({
    color: props.title ? '#8F8F8F' : theme.palette.secondary.main,
    fontSize: '0.75rem',
  }),
}));

export default function UserInfo({
  name,
  title,
  place,
  imgSrc,
  size,
  direction
}: UserInfoProps): JSX.Element {
  const fontSize: string = getFontSize(size);
  const classes = useStyles({ fontSize, title, direction });
  return (
    <Grid container alignItems="center" direction={direction}>
      <Grid item>
        <UserAvatar alt={name} src={imgSrc} size={size} />
      </Grid>
      <Grid item className={classes.text}>
        <Typography className={classes.name}>{name}</Typography>
        {title &&
          <Typography
            color="secondary"
            className={classes.title}>
              {title}
          </Typography>}
        {place && <Typography className={classes.place}>{place}</Typography>}
      </Grid>
    </Grid>
  );
}
