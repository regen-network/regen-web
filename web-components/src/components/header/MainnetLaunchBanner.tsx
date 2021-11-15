import React from 'react';
import clsx from 'clsx';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import { Link, Typography } from '@mui/material';

import Countdown from '../countdown';

type Props = {
  launchDate: string;
  className?: string;
};

const bannerBlue = '#6D9BDB';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
    background: bannerBlue,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5, 0),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4, 0),
      borderBottom: `5px solid ${bannerBlue}`, // TODO: this is a hack to get around a weird display glitch that seems to be caused by the mobile drawer
    },
  },
  text: {
    color: 'white',
    fontWeight: 700,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4),
    },
  },
  link: {
    textDecoration: 'underline',
  },
}));

const MainnetLaunchBanner: React.FC<Props> = props => {
  const classes = useStyles();
  return new Date() < new Date(props.launchDate) ? (
    <div className={clsx(classes.root, props.className)}>
      <Typography className={classes.text}>
        <span role="img" aria-label="mainnet launch">
          🚀
        </span>{' '}
        <Link className={classes.link} href="/mainnet/">
          Mainnet
        </Link>{' '}
        is launching in <Countdown date={props.launchDate} />
      </Typography>
    </div>
  ) : null;
};

export default MainnetLaunchBanner;
