import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';

import Title from '../title';
import Section from '../section';
import NewsletterForm from '../form/NewsletterForm';
import { SocialLinks } from './SocialLinks';

export interface FooterItemProps {
  title: string;
  items: { title: string; href: string; target?: string }[];
}

interface FooterProps {
  footerItems: [FooterItemProps, FooterItemProps, FooterItemProps];
  termsUrl: string;
  privacyUrl: string;
  paddingBottom?: boolean;
  apiUri?: string;
}

interface StyleProps {
  paddingBottom?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.info.dark,
  },
  section: props => ({
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
      '&:hover': {
        color: theme.palette.info.contrastText,
      },
    },
  }),
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
  },
  textField: {
    paddingRight: theme.spacing(2.5),
    '& .MuiInputBase-root': {
      fontSize: theme.spacing(3.5),
      height: theme.spacing(12.5),
    },
  },
  button: {
    fontSize: theme.spacing(3.5),
    height: theme.spacing(12.5),
    padding: theme.spacing(2.5),
  },
  bottomGrid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8.25),
      marginBottom: theme.spacing(8.25),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(6),
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
  separator: {
    borderTop: 0,
    borderColor: theme.palette.grey[50],
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(19.75),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(18.75),
    },
  },
  community: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'center',
      marginTop: theme.spacing(16.25),
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
            <Link href={item.href} rel="noopener noreferrer" target={item.target}>
              {item.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default function Footer({
  footerItems,
  termsUrl,
  privacyUrl,
  paddingBottom,
  apiUri = 'http://localhost:5000',
}: FooterProps): JSX.Element {
  const classes = useStyles({ paddingBottom });

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <FooterItem title={footerItems[0].title} items={footerItems[0].items} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FooterItem title={footerItems[1].title} items={footerItems[1].items} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FooterItem title={footerItems[2].title} items={footerItems[2].items} />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.footerItem}>
            <Title className={classes.title} variant="h5">
              subscribe
            </Title>
            <Typography className={classes.subTitle}>
              Stay up to date! Sign up for our monthly newsletter.
            </Typography>
            <div className={classes.mail}>
              <NewsletterForm
                submitLabel="subscribe"
                buttonClassName={classes.button}
                textFieldClassName={classes.textField}
                apiUri={apiUri}
                gridXs={{ textField: 7, button: 5 }}
              />
            </div>
            {/* <Link className={classes.newsletter}>See archive of past newsletters»</Link> */}
          </Grid>
        </Grid>
        <SocialLinks className={classes.community} />
        <hr className={classes.separator} />
        <Grid className={classes.bottomGrid} container justify="space-between">
          <Grid item className={classes.bottom}>
            <Link href={termsUrl}>Terms</Link> | <Link href={privacyUrl}>Privacy</Link>
          </Grid>
          <Grid item className={classes.bottom}>
            © 2021 Regen Network Development, Inc
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}
