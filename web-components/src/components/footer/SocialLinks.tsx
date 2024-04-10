import React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { makeStyles } from 'tss-react/mui';

import { cn } from '../../utils/styles/cn';
import DiscordIcon from '../icons/social/DiscordIcon';
import GithubIcon from '../icons/social/GithubIcon';
import LinkedInIcon from '../icons/social/LinkedInIcon';
import MediumIcon from '../icons/social/MediumIcon';
import TwitterIcon from '../icons/social/TwitterIcon';
import YoutubeIcon from '../icons/social/YoutubeIcon';
import { Label } from '../typography';

interface Props {
  className?: string;
}

const useStyles = makeStyles()(theme => ({
  social: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  icon: {
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(12.75),
      height: theme.spacing(12.75),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(7.75),
      height: theme.spacing(7.75),
    },
  },
  smallIcon: {
    padding: theme.spacing(1.25),
  },
  discord: {
    marginTop: theme.spacing(0.5),
  },
}));

const SocialLinks: React.FC<React.PropsWithChildren<Props>> = ({
  className,
}) => {
  const { classes: styles, cx } = useStyles();

  return (
    <div className={className}>
      <Label
        size="lg"
        mobileSize="sm"
        sx={{ textAlign: { sm: 'center' }, mb: { xs: 4.5, sm: 3.75 } }}
      >
        join the community
      </Label>
      <Grid
        container
        alignItems="center"
        wrap="nowrap"
        className={styles.social}
      >
        <Link
          href="http://twitter.com/regen_network"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterIcon className="w-[17px] h-[16px] sm:w-[23px] sm:h-[22px] sm:mx-10" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/regen-network/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon className={cn(styles.icon, 'sm:mx-10')} />
        </Link>
        <Link
          href="https://medium.com/regen-network"
          rel="noopener noreferrer"
          target="_blank"
        >
          <MediumIcon className={cn(styles.icon, 'sm:mx-10')} />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g"
          rel="noopener noreferrer"
          target="_blank"
        >
          <YoutubeIcon
            className={cx(styles.smallIcon, styles.icon, 'sm:mx-10')}
          />
        </Link>
        <Link
          href="https://github.com/regen-network/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubIcon className={cn(styles.icon, 'sm:mx-10')} />
        </Link>
        <Link
          href="https://discord.gg/6ghMcMBjbz"
          rel="noopener noreferrer"
          target="_blank"
        >
          <DiscordIcon
            className={cx(
              styles.smallIcon,
              styles.icon,
              styles.discord,
              'sm:mx-10',
            )}
          />
        </Link>
      </Grid>
    </div>
  );
};

export { SocialLinks };
