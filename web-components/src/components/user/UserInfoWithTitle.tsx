import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import UserInfo, { User } from '../user/UserInfo';

interface UserInfoWithTitleProps {
  user: User;
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')] : {
      fontSize: '0.75rem',
      marginBottom: theme.spacing(4.25),
    },
    [theme.breakpoints.down('xs')] : {
      fontSize: '0.6875rem',
      marginBottom: theme.spacing(4),
    },
    letterSpacing: theme.spacing(0.125),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
}));

export default function UserInfoWithTitle({
  user,
  title
}: UserInfoWithTitleProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div>
      <Typography className={classes.title}>{title}</Typography>
      <UserInfo
        user={user}
        size="big"
      />
    </div>
  );
}
