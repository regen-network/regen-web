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

export interface FooterItemProps {
  title: string;
  items: { title: string; href: string }[];
}

interface FooterProps {
  footerItems: [FooterItemProps, FooterItemProps, FooterItemProps];
  mailerLiteDataAccount: string;
  mailerLiteDataForm: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.info.dark,
    '& a': {
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  main: {},
  title: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    letterSpacing: '1px',
    [theme.breakpoints.up('sm')]: {
      lineHeight: theme.spacing(6.5),
    },
    [theme.breakpoints.down('xs')]: {
      lineHeight: theme.spacing(4.5),
      fontSize: theme.spacing(3.5),
    },
  },
  subTitle: {
    lineHeight: '150%',
    color: theme.palette.primary.main,
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  mail: {},
}));

const FooterItem = ({ title, items }: FooterItemProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Title className={classes.title} variant="h5">
        {title}
      </Title>
      <List>
        {items.map((item, index) => (
          <ListItem className={classes.subTitle} key={index}>
            <Link href={item.href}>{item.title}</Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default function Footer({
  footerItems,
  mailerLiteDataAccount,
  mailerLiteDataForm,
}: FooterProps): JSX.Element {
  const classes = useStyles();

  return (
    <Section className={classes.root}>
      <Grid container className={classes.main}>
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
          <div>
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
          </div>
        </Grid>
      </Grid>
    </Section>
  );
}
