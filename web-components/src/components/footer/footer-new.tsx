import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import Title from '../title';
import Section from '../section';
import { HeaderLogoLink } from '../header/HeaderLogoLink';

import { SocialLinks } from './SocialLinks';

export interface FooterItemProps {
  title: string;
  items: { title: string; href: string; target?: string }[];
  linkComponent?: React.FC<{ href: string }>;
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.info.dark,
  },
  section: {
    '& a': {
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
      '&:hover': {
        color: theme.palette.info.contrastText,
      },
    },
  },
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
      marginTop: theme.spacing(10),
    },
  },
  link: {
    color: theme.palette.secondary.main,
  },
}));

const FooterItem: React.FC<FooterItemProps> = ({
  title,
  items,
  linkComponent: LinkComponent = Link,
}) => {
  const styles = useStyles({});

  return (
    <>
      <Title className={styles.title} variant="h5">
        {ReactHtmlParser(title)}
      </Title>
      <List className={styles.list}>
        {items.map((item, index) => (
          <ListItem className={styles.subTitle} key={index}>
            <LinkComponent
              href={item.href}
              rel="noopener noreferrer"
              target={item.target}
            >
              {ReactHtmlParser(item.title)}
            </LinkComponent>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const Footer: React.FC<{
  footerItems: [FooterItemProps, FooterItemProps, FooterItemProps];
  termsUrl: string;
  privacyUrl: string;
  iconLink?: React.FC<{ color: string }>;
  linkComponent?: React.FC<{ href: string }>;
}> = ({
  footerItems,
  termsUrl,
  privacyUrl,
  linkComponent: LinkComponent = Link,
  iconLink: IconLink = HeaderLogoLink,
}) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <div className={styles.root}>
      <Section classes={{ root: styles.section }}>
        <Grid container spacing={10}>
          <Grid item xs={12} lg={3}>
            <Box
              pb={[0, 8]}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <IconLink color={theme.palette.primary.main} />
              <Box mt={4}>
                <Typography className={styles.subTitle}>
                  A project of{' '}
                  <a href="https://www.regen.network" className={styles.link}>
                    Regen Network
                    <br /> Development, Inc.
                  </a>
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FooterItem
              title={footerItems[0].title}
              items={footerItems[0].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FooterItem
              title={footerItems[1].title}
              items={footerItems[1].items}
              linkComponent={LinkComponent}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <FooterItem
              title={footerItems[2].title}
              items={footerItems[2].items}
              linkComponent={LinkComponent}
            />
          </Grid>
        </Grid>

        <Box mt={[10, 16.25]}>
          <SocialLinks />
        </Box>

        <hr className={styles.separator} />
        <Grid className={styles.bottomGrid} container justify="space-between">
          <Grid item className={styles.bottom}>
            <Link href={termsUrl}>Terms</Link> |{' '}
            <Link href={privacyUrl}>Privacy</Link>
          </Grid>
          <Grid item className={styles.bottom}>
            © 2021 Regen Network Development, Inc
          </Grid>
        </Grid>
      </Section>
    </div>
  );
};

export { Footer };
