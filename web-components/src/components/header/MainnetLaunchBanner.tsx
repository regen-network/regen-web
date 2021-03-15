import React from 'react';
import { Link, makeStyles, Theme, Typography } from '@material-ui/core';
import Countdown from '../countdown';

type Props = {
  launchDate: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(5),
    background: '#6D9BDB',
  },
  text: {
    color: 'white',
    fontSize: theme.spacing(5),
    fontWeight: 700,
  },
  link: {
    textDecoration: 'underline',
  },
}));

const MainnetLaunchBanner: React.FC<Props> = p => {
  const classes = useStyles();
  return new Date() < new Date(p.launchDate) ? (
    <div className={classes.root}>
      <Typography className={classes.text}>
        <span role="img" aria-label="mainnet launch">
          🚀
        </span>{' '}
        <Link className={classes.link} href="/mainnet/">
          Mainnet
        </Link>{' '}
        is launching in <Countdown date={p.launchDate} />
      </Typography>
    </div>
  ) : null;
};

export default MainnetLaunchBanner;
