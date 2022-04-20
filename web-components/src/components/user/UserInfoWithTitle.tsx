import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Typography from '@mui/material/Typography';

import UserInfo, { User } from '../user/UserInfo';
import type { TextSize } from '../typography/sizing';

interface UserInfoWithTitleProps {
  user: User;
  title: string;
  border?: boolean;
  size?: TextSize;
  icon?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.75rem',
      marginBottom: theme.spacing(5.2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6875rem',
      marginBottom: theme.spacing(4),
    },
    letterSpacing: theme.spacing(0.125),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: theme.palette.info.main,
  },
}));

export default function UserInfoWithTitle({
  user,
  title,
  border = true,
  size = 'lg',
  icon,
}: UserInfoWithTitleProps): JSX.Element {
  const classes = useStyles({});
  return (
    <div>
      <Typography className={classes.title}>{title}</Typography>
      <UserInfo user={user} size={size} border={border} icon={icon} />
    </div>
  );
}
