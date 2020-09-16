import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import BlockIcon from 'web-components/lib/components/icons/BlockIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';

import BackgroundSection from '../../components/BackgroundSection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(7.5),
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(10),
    },
  },
  iconLabel: {
    paddingBottom: theme.spacing(12.5),
  },
  title: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.primary.main,
    lineHeight: '150%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      paddingBottom: theme.spacing(15.5),
    },
  },
  label: {
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: 900,
    textAlign: 'center',
    lineHeight: '120%',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(6),
      paddingTop: theme.spacing(5.25),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(1.5),
    },
  },
  iconContainer: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'block',
    textDecoration: 'none',
    '&:link, &:visited, &:hover, &:active': {
      textDecoration: 'none',
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    // [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
    //   width: theme.spacing(13),
    //   height: theme.spacing(13),
    // },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
  icon: {
    color: 'transparent',
    width: '100%',
    height: '100%',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
  },
  smallIcon: {
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      padding: theme.spacing(3),
    },
  },
}));

interface IconLabelProps {
  icon: JSX.Element;
  label: string;
  href: string;
}

const IconLabel = ({ icon, label, href }: IconLabelProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.iconLabel}>
      <a href={href} rel="noopener noreferrer" target="_blank" className={classes.link}>
        <div className={classes.iconContainer}>{icon}</div>
      </a>
      <div className={classes.label}>{label}</div>
    </div>
  );
};

const ConnectSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "developers-connect-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: developersYaml {
        connectSection {
          header
        }
      }
    }
  `);
  const content = data.text.connectSection;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <BackgroundSection
      className={classes.root}
      linearGradient="unset"
      topSection={false}
      imageData={data.background.childImageSharp.fluid}
      header={content.header}
      titleClassName={classes.title}
      titleVariant="h2"
    >
      <Grid container spacing={4} justify="center">
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://t.me/regennetwork_public"
            icon={
              <TelegramIcon
                className={classes.icon}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Regen Network: Public"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://t.me/joinchat/FJGNSxOpjJcgrUGwAAOKUg"
            icon={
              <TelegramIcon
                className={classes.icon}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Regen Network: DVD"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://t.me/regennetworkdevannounce"
            icon={
              <TelegramIcon
                className={classes.icon}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Development Updates"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://medium.com/regen-network"
            icon={
              <MediumIcon
                className={classes.icon}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Medium"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://twitter.com/regen_network"
            icon={
              <TwitterIcon
                className={classes.icon}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Twitter"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://regen-network.gitlab.io/whitepaper/WhitePaper.pdf"
            icon={
              <WhitepaperIcon
                className={clsx(classes.smallIcon, classes.icon)}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Whitepaper"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://github.com/regen-network/"
            icon={
              <GithubIcon
                className={classes.icon}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Github"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <IconLabel
            href="https://regen-network.gitlab.io/lunie/"
            icon={
              <BlockIcon
                className={clsx(classes.smallIcon, classes.icon)}
                color={theme.palette.primary.main}
                hoverColor={theme.palette.secondary.main}
              />
            }
            label="Block Explorer"
          />
        </Grid>
      </Grid>
    </BackgroundSection>
  );
};

export default ConnectSection;
