import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import UserInfoWithTitle from '../user/UserInfoWithTitle';
import { User } from '../user/UserInfo';
import ContainedButton from '../buttons/ContainedButton';

interface BuyFooterProps {
  user: User;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(30),
    width: '100%',
    borderTop: '1px solid #EAEAEA',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(38.25)}`,
    },
  },
}));

export default function BuyFooter({ user, onClick }: BuyFooterProps): JSX.Element {
  const classes = useStyles({});

  return (
    <Grid container wrap="nowrap" alignItems="center" justify="space-between" className={classes.root}>
      <Grid item>
        <UserInfoWithTitle title="credits issued by" user={user} />
      </Grid>
      <Grid item>
        <ContainedButton onClick={onClick}>buy credits</ContainedButton>
      </Grid>
    </Grid>
  );
}
