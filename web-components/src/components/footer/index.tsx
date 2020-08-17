import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';

import Title from '../title';
import Section from '../section';
import InstagramIcon from '../icons/social/InstagramIcon';
import TelegramIcon from '../icons/social/TelegramIcon';
import FacebookIcon from '../icons/social/FacebookIcon';
import TwitterIcon from '../icons/social/TwitterIcon';
import LinkedInIcon from '../icons/social/LinkedInIcon';
import MediumIcon from '../icons/social/MediumIcon';
import YoutubeIcon from '../icons/social/YoutubeIcon';
import GithubIcon from '../icons/social/GithubIcon';

export interface FooterItemProps {
  title: string;
  items: { title: string; href: string }[];
}

interface FooterProps {
  footerItems: [FooterItemProps, FooterItemProps, FooterItemProps];
  mailerLiteDataAccount: string;
  mailerLiteDataForm: string;
  termsUrl: string;
  privacyUrl: string;
  paddingBottom?: string;
}

interface StyleProps {
  paddingBottom?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: props => ({
    backgroundColor: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: props.paddingBottom ? theme.spacing(30) : 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: props.paddingBottom ? theme.spacing(19) : 0,
    },
    '& a': {
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  }),
  title: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
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
  subTitle: {
    lineHeight: '150%',
    color: theme.palette.primary.main,
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
      marginBottom: theme.spacing(1.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  },
  list: {
    padding: 0,
  },
  mail: {
    paddingTop: theme.spacing(4),
    '& .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal': {
      width: '60%',
    },
    '& .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal': {
      width: '40%',
    },
    '& .ml-form-embedContainer.ml-subscribe-form .ml-form-embedWrapper': {
      '& .ml-form-successBody, .ml-form-embedBody': {
        padding: '0 !important',
        '& .ml-form-formContent': {
          padding: '0 !important',
        },
      },
      '& input, & button': {
        height: `${theme.spacing(12.5)} !important`,
      },
    },
  },
  bottomGrid: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(9),
    },
  },
  bottom: {
    color: theme.palette.primary.main,
    lineHeight: '150%',
    fontSize: theme.spacing(3.5),
  },
  newsletter: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    lineHeight: '145%',
    fontSize: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(2.5),
    display: 'block',
  },
  social: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: theme.spacing(-2),
  },
  separator: {
    borderTop: 0,
    borderColor: theme.palette.grey[50],
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(20.5),
      marginBottom: theme.spacing(8.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(12.75),
      marginBottom: theme.spacing(9),
    },
  },
  footerItem: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(11.25),
    },
  },
}));

const FooterItem = ({ title, items }: FooterItemProps): JSX.Element => {
  const classes = useStyles({});

  return (
    <div className={classes.footerItem}>
      <Title className={classes.title} variant="h5">
        {title}
      </Title>
      <List className={classes.list}>
        {items.map((item, index) => (
          <ListItem className={classes.subTitle} key={index}>
            <Link href={item.href}>{item.title}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default function Footer({
  footerItems,
  mailerLiteDataAccount,
  mailerLiteDataForm,
  termsUrl,
  privacyUrl,
  paddingBottom,
}: FooterProps): JSX.Element {
  const classes = useStyles({ paddingBottom });

  return (
    <Section className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <FooterItem title={footerItems[0].title} items={footerItems[0].items}></FooterItem>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FooterItem title={footerItems[1].title} items={footerItems[1].items}></FooterItem>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FooterItem title={footerItems[2].title} items={footerItems[2].items}></FooterItem>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Title className={classes.title} variant="h5">
            community
          </Title>
          <Typography className={classes.subTitle}>
            Stay up to date! Subscribe to our monthly newsletter or join the community.
          </Typography>
          <div
            className={clsx('ml-form-embed', classes.mail)}
            data-account={mailerLiteDataAccount}
            data-form={mailerLiteDataForm}
          />
          <Link className={classes.newsletter}>See archive of past newsletters»</Link>
          <div className={classes.social}>
            <Link href="https://www.instagram.com/regennetwork/" rel="noopener noreferrer" target="_blank">
              <InstagramIcon />
            </Link>
            <Link href="http://t.me/regennetwork_public" rel="noopener noreferrer" target="_blank">
              <TelegramIcon />
            </Link>
            <Link href="https://facebook.com/weareregennetwork" rel="noopener noreferrer" target="_blank">
              <FacebookIcon />
            </Link>
            <Link href="http://twitter.com/regen_network" rel="noopener noreferrer" target="_blank">
              <TwitterIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/company/regen-network/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </Link>
            <Link href="https://medium.com/regen-network" rel="noopener noreferrer" target="_blank">
              <MediumIcon />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g"
              rel="noopener noreferrer"
              target="_blank"
            >
              <YoutubeIcon />
            </Link>
            <Link href="https://github.com/regen-network/" rel="noopener noreferrer" target="_blank">
              <GithubIcon />
            </Link>
          </div>
        </Grid>
      </Grid>
      <hr className={classes.separator} />
      <Grid className={classes.bottomGrid} container justify="space-between">
        <Grid item className={classes.bottom}>
          <Link href={termsUrl}>Terms</Link> | <Link href={privacyUrl}>Privacy</Link>
        </Grid>
        <Grid item className={classes.bottom}>
          © 2020 Regen Network
        </Grid>
      </Grid>
    </Section>
  );
}
