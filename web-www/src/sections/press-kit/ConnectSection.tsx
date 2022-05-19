import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';

import { Theme } from 'web-components/lib/theme/muiTheme';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import YoutubeIcon from 'web-components/lib/components/icons/social/YoutubeIcon';
import FacebookIcon from 'web-components/lib/components/icons/social/FacebookIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import { PresskitConnectSectionQuery } from '../../generated/graphql';
import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexGrow: '20%',
    },
  },
}));

const query = graphql`
  query presskitConnectSection {
    background: file(relativePath: { eq: "press-kit-connect-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityPresskitPage {
      connectSectionHeader
    }
  }
`;

const PressKitConnectSection = (): JSX.Element => {
  const { sanityPresskitPage: data, background } =
    useStaticQuery<PresskitConnectSectionQuery>(query);
  const theme = useTheme();
  const styles = useStyles();
  const icons: IconLabelProps[] = [
    {
      icon: (
        <TelegramIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://t.me/regennetwork_public',
      label: 'Telegram for General Updates',
    },
    {
      icon: (
        <TelegramIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Telegram for Developers',
    },
    {
      icon: (
        <MediumIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://medium.com/regen-network',
      label: 'Medium',
    },
    {
      icon: (
        <TwitterIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://twitter.com/regen_network',
      label: 'Twitter',
    },
    {
      icon: (
        <DiscordIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://discord.gg/BDcBJu3',
      label: 'Discord community',
      small: true,
    },
    {
      icon: (
        <YoutubeIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g',
      label: 'Youtube',
      small: true,
    },
    {
      icon: (
        <LinkedInIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://www.linkedin.com/company/regen-network',
      label: 'LinkedIn',
    },
    {
      icon: (
        <FacebookIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://facebook.com/weareregennetwork',
      label: 'Facebook',
    },
    {
      icon: (
        <GithubIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://github.com/regen-network/',
      label: 'Github',
    },
    {
      icon: (
        <EmailIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'http://newsletter.regen.network/',
      label: 'Sign up for our newsletter',
      small: true,
    },
  ];
  return (
    <ConnectSection
      itemClassName={styles.item}
      header={data?.connectSectionHeader || ''}
      background={background as any}
      icons={icons}
    />
  );
};

export default PressKitConnectSection;
