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
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: theme.spacing(0.125),
    marginBottom: theme.spacing(4.25),
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
