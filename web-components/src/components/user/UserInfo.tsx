import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid, { GridDirection } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserAvatar from './UserAvatar';
import { getFontSize, FontSizes } from '../../theme/sizing';

export interface User {
  name: string;
  place?: string;
  imgSrc: string;
  description?: string;
}

interface UserInfoProps {
  user: User;
  size?: string;
  direction?: GridDirection;
}

interface StyleProps {
  fontSize: FontSizes;
  description?: string;
  direction?: GridDirection;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  text: props => ({
    marginLeft: theme.spacing(2.4),
    textAlign: props.direction === 'column' ? 'center' : 'left',
  }),
  name: props => ({
    [theme.breakpoints.up('sm')]: {
      fontSize: props.fontSize.sm,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: props.fontSize.xs,
    },
    fontWeight: 'bold',
    // paddingBottom: theme.spacing(1.5),
  }),
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: getFontSize('medium').sm,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: getFontSize('medium').xs,
    },
    color: theme.palette.info.main,
  },
  place: props => ({
    color: theme.palette.info.main,
    // color: props.description ? '#8F8F8F' : theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: getFontSize('small').sm,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: getFontSize('small').xs,
    },
    paddingBottom: theme.spacing(2),
  }),
}));

export default function UserInfo({ user, size, direction }: UserInfoProps): JSX.Element {
  const fontSize: FontSizes = getFontSize(size);
  const classes = useStyles({ fontSize, description: user.description, direction });
  return (
    <Grid container direction={direction} wrap="nowrap">
      <Grid item>
        <UserAvatar alt={user.name} src={user.imgSrc} size={size} />
      </Grid>
      <Grid item className={classes.text}>
        <Typography className={classes.name}>{user.name}</Typography>
        {user.place && <Typography className={classes.place}>{user.place}</Typography>}
        {user.description && <Typography className={classes.description}>{user.description}</Typography>}
      </Grid>
    </Grid>
  );
}
