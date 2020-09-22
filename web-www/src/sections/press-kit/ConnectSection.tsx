import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import YoutubeIcon from 'web-components/lib/components/icons/social/YoutubeIcon';
import FacebookIcon from 'web-components/lib/components/icons/social/FacebookIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexGrow: '20%',
    },
  },
}));

const PressKitConnectSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "press-kit-connect-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: pressKitYaml {
        connectSection {
          header
        }
      }
    }
  `);
  const content = data.text.connectSection;
  const theme = useTheme();
  const classes = useStyles();
  const icons: IconLabelProps[] = [
    {
      icon: <RegenLogoIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: '/',
      label: 'Website',
      small: true,
    },
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetwork_public',
      label: 'Telegram for General Updates',
    },
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Telegram for Developers',
    },
    {
      icon: <MediumIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://medium.com/regen-network',
      label: 'Medium',
    },
    {
      icon: <TwitterIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://twitter.com/regen_network',
      label: 'Twitter',
    },
    {
      icon: <YoutubeIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g',
      label: 'Youtube',
    },
    {
      icon: <LinkedInIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://www.linkedin.com/company/regen-network',
      label: 'LinkedIn',
    },
    {
      icon: <FacebookIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://facebook.com/weareregennetwork',
      label: 'Facebook',
    },
    {
      icon: <GithubIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://github.com/regen-network/',
      label: 'Github',
    },
    {
      icon: <EmailIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'http://newsletter.regen.network/',
      label: 'Sign up for our newsletter',
      small: true,
    },
  ];
  return (
    <ConnectSection
      itemClassName={classes.item}
      header={content.header}
      background={data.background}
      icons={icons}
    />
  );
};

export default PressKitConnectSection;
