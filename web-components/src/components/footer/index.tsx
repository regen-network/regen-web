import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserInfoWithTitle from '../user/UserInfoWithTitle';
import { User } from '../user/UserInfo';

interface FooterProps {
  user: User;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.info.light,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(9.25)} ${theme.spacing(38.5)} ${theme.spacing(11.25)}`,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      padding: `${theme.spacing(9.25)} ${theme.spacing(4)} ${theme.spacing(12.5)}`,
    },
  },
  copyrightContainer: {
    [theme.breakpoints.up('sm')]: {
      alignSelf: 'flex-end',
    },
  },
  copyright: {
    color: theme.palette.info.main,
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(13.75),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3.25),
    },
  },
}));

export default function Footer({ user }: FooterProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Grid container wrap="nowrap" alignItems="center" justify="space-between" className={classes.root}>
      <Grid item>
        <UserInfoWithTitle title="credits issued by" user={user} border={false} size="xl" />
      </Grid>
      <Grid item className={classes.copyrightContainer}>
        <Typography className={classes.copyright} variant="body2">
          © 2020 Regen Network
        </Typography>
      </Grid>
    </Grid>
  );
}
