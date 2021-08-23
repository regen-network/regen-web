import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // marginTop: theme.spacing(24),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexBasis: '20%',
    },
  },
}));

const DevelopersConnectSection = (): JSX.Element => {
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
  const icons: IconLabelProps[] = [
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Telegram',
      subLabel: '~54646 followers',
    },

    {
      icon: <TwitterIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://twitter.com/regen_network',
      label: 'Twitter',
      subLabel: '~123 followers',
    },

    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Discord',
      subLabel: '~54646 members',
    },
  ];
  return (
    <ConnectSection
      className={classes.root}
      itemClassName={classes.item}
      header={'Connnect with our community'}
      // header={content.header}
      background={data.background}
      icons={icons}
      titleClassName={classes.title}
    />
  );
};

export default DevelopersConnectSection;
