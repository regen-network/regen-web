import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import Title from '../title';
import InstagramIcon from '../icons/social/InstagramIcon';
import TelegramIcon from '../icons/social/TelegramIcon';
import FacebookIcon from '../icons/social/FacebookIcon';
import TwitterIcon from '../icons/social/TwitterIcon';
import LinkedInIcon from '../icons/social/LinkedInIcon';
import MediumIcon from '../icons/social/MediumIcon';
import YoutubeIcon from '../icons/social/YoutubeIcon';
import GithubIcon from '../icons/social/GithubIcon';

const useStyles = makeStyles(theme => ({
  title: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    fontWeight: 800,
    letterSpacing: '1px',
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(6.5),
      marginBottom: theme.spacing(3.75),
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: theme.spacing(4.5),
      fontSize: theme.spacing(3.5),
      marginBottom: theme.spacing(4.5),
    },
  },
  social: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(-2),
      justifyContent: 'space-between',
    },
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12.75),
      height: theme.spacing(12.75),
      marginLeft: theme.spacing(2.5),
      marginRight: theme.spacing(2.5),
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(7.75),
      height: theme.spacing(7.75),
    },
  },
  community: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },
  smallIcon: {
    padding: theme.spacing(1.25),
  },
}));

const SocialLinks: React.FC = () => {
  const styles = useStyles();

  return (
    <div>
      <Title className={cx(styles.community, styles.title)} variant="h5">
        join the community
      </Title>
      <Grid container wrap="nowrap" className={styles.social}>
        <Link href="https://www.instagram.com/regennetwork/" rel="noopener noreferrer" target="_blank">
          <InstagramIcon className={styles.icon} />
        </Link>
        <Link href="http://t.me/regennetwork_public" rel="noopener noreferrer" target="_blank">
          <TelegramIcon className={styles.icon} />
        </Link>
        <Link href="https://facebook.com/weareregennetwork" rel="noopener noreferrer" target="_blank">
          <FacebookIcon className={styles.icon} />
        </Link>
        <Link href="http://twitter.com/regen_network" rel="noopener noreferrer" target="_blank">
          <TwitterIcon className={styles.icon} />
        </Link>
        <Link
          href="https://www.linkedin.com/company/regen-network/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon className={styles.icon} />
        </Link>
        <Link href="https://medium.com/regen-network" rel="noopener noreferrer" target="_blank">
          <MediumIcon className={styles.icon} />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g"
          rel="noopener noreferrer"
          target="_blank"
        >
          <YoutubeIcon className={cx(styles.smallIcon, styles.icon)} />
        </Link>
        <Link href="https://github.com/regen-network/" rel="noopener noreferrer" target="_blank">
          <GithubIcon className={styles.icon} />
        </Link>
      </Grid>
    </div>
  );
};

export { SocialLinks };
